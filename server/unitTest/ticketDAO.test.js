const DBManager = require('./../database/dbManager');
const TicketDAO = require('./../daos/ticketDAO');
const { purgeAllTables } = require('./purgeUtils');

const dbManager = new DBManager();
const ticketDAO = new TicketDAO(dbManager);
describe('Ticket DAO unit test', () => {
    beforeAll(async () => { dbManager.openConnection(); await purgeAllTables(dbManager) });
    beforeEach(() => { dbManager.openConnection(); });
    afterEach(async () => {
        try { dbManager.closeConnection(); }
        catch (err) {/*foo*/ }
    });

    describe('Constructor test', () => {
        expect(() => new TicketDAO())
            .toThrow('DbManager must be defined for DAO layer!');
    });

    test('Add new ticket', async () => {
        await ticketDAO.insertTicket('a', 1);
        await ticketDAO.insertTicket('b', 1);
        await ticketDAO.insertTicket('a', 2);

        let res = 2;
        expect(res).toEqual(await ticketDAO.getLastTicketPerService('a'));
        res = 1;
        expect(res).toEqual(await ticketDAO.getOldestTicket('a'));

        dbManager.closeConnection();
        await expect(ticketDAO.insertTicket('a', 3)).rejects.toThrow();
    })

    test('Delete ticket', async () => {
        await ticketDAO.deleteOldestTicket('a', '1');
        await ticketDAO.deleteOldestTicket('a', '2');

        expect(0).toEqual(await ticketDAO.getLastTicketPerService('a'));

        dbManager.closeConnection();
        await expect(ticketDAO.deleteOldestTicket('a', 3)).rejects.toThrow();
    })


})