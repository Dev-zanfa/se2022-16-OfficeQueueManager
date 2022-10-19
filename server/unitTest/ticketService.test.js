const DBManager = require('./../database/dbManager');
const TicketService = require('./../services/ticketService');
const TicketDAO = require('./../daos/ticketDAO');
const { purgeAllTables } = require('./purgeUtils');

const dbManager = new DBManager();
const ticketDAO = new TicketDAO(dbManager);
const ticketService = new TicketService(ticketDAO);

describe('Ticket DAO unit test', () => {
    beforeAll(async () => { dbManager.openConnection(); await purgeAllTables(dbManager) });
    beforeEach(() => { dbManager.openConnection(); });
    afterEach(async () => {
        try { dbManager.closeConnection(); }
        catch (err) {/*foo*/ }
    });

    describe('Constructor test', () => {
        expect(() => new TicketService())
            .toThrow('ticketDAO must be defined for ticketService service!');
    });

    test('Add new ticket', async () => {
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