const DBManager = require('./../database/dbManager');
const TicketService = require('./../services/ticketService');
const TicketDAO = require('./../daos/ticketDAO');
const QueueDAO = require('../daos/queueDAO');
const { purgeAllTables } = require('./purgeUtils');
const ServiceDAO = require('../daos/serviceDAO');

const dbManager = new DBManager();
const ticketDAO = new TicketDAO(dbManager);
const queueDAO = new QueueDAO(dbManager);
const serviceDAO = new ServiceDAO(dbManager);
const ticketService = new TicketService(ticketDAO, serviceDAO, queueDAO);

describe('Ticket DAO unit test', () => {
    beforeAll(async () => { dbManager.openConnection(); await purgeAllTables(dbManager) });
    beforeEach(() => { dbManager.openConnection(); });
    afterEach(async () => {
        try { dbManager.closeConnection(); }
        catch (err) {/*foo*/ }
    });

    describe('Constructor test', () => {
        expect(() => new TicketService(null, serviceDAO, queueDAO))
            .toThrow('ticketDAO must be defined for ticketService service!');
        expect(() => new TicketService(ticketDAO, null, queueDAO))
            .toThrow('serviceDao must be defined for ticketService service!');
        expect(() => new TicketService(ticketDAO, serviceDAO, null))
            .toThrow('queueDao must be defined for ticketService service!');
    });

    test('Add new ticket', async () => {
        await serviceDAO.insertService("a", "service1", 15);
        await serviceDAO.insertService("b", "service2", 20);
        let query = "INSERT INTO Queue (service, count) VALUES (?, ?)";
        await dbManager.query(query, ["a", 0]);
        await dbManager.query(query, ["b", 0]);

        await ticketService.addTicket('a');
        let res = 1;
        expect(res).toEqual(await ticketDAO.getLastTicketPerService('a'));
        await ticketService.addTicket('a');
        res = 2;
        expect(res).toEqual(await ticketDAO.getLastTicketPerService('a'));
        await ticketService.addTicket('b');
        res = 1;
        expect(res).toEqual(await ticketDAO.getOldestTicket('a'));

        await expect(ticketService.addTicket('l')).rejects.toEqual({
            returnCode: 422,
            message: 'validation of request body failed, service does not exists'
        });

        dbManager.closeConnection();
        await expect(ticketService.addTicket('a')).rejects.toThrow();
    })

})