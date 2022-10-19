const DBManager = require('../database/dbManager');
const CounterService = require('../services/counterService');
const CounterDAO = require('./../daos/counterDAO');
const TicketDAO = require('./../daos/ticketDAO');
const ServiceDAO = require('./../daos/serviceDAO');
const QueueDAO = require('./../daos/queueDAO');
const { purgeAllTables } = require('./purgeUtils');

const dbManager = new DBManager();
const counterDAO = new CounterDAO(dbManager);
const ticketDAO = new TicketDAO(dbManager);
const queueDAO = new QueueDAO(dbManager);
const serviceDAO = new ServiceDAO(dbManager);
const counterService = new CounterService(counterDAO, queueDAO, ticketDAO, serviceDAO);

describe('Counter Service unit test', () => {
    beforeAll(async () => { 
        dbManager.openConnection(); 
        await purgeAllTables(dbManager);
    });

    beforeEach(() => { 
        dbManager.openConnection(); 
    });
    afterEach(async () => {
        try { dbManager.closeConnection(); }
        catch (err) {/*foo*/ }
    });

    describe('Constructor test', () => {
        test('counterDAO error', async () => {
            expect(() => new CounterService())
            .toThrow('counterDAO must be defined for counter service!');
        });

        test('queueDAO error', async () => {
            expect(() => new CounterService(counterDAO))
            .toThrow('queueDAO must be defined for counter service!');
        });

        test('ticketDAO error', async () => {
            expect(() => new CounterService(counterDAO, queueDAO))
            .toThrow('ticketDAO must be defined for counter service!');
        });

        test('serviceDAO error', async () => {
            expect(() => new CounterService(counterDAO,queueDAO,ticketDAO))
            .toThrow('serviceDAO must be defined for counter service!');
        });
       
    });

    test('test get next customer', async () => {
       
        // insert data in the DB
        await serviceDAO.insertService("S1", "service1", 15);
        await serviceDAO.insertService("S2", "service2", 20);
        await serviceDAO.insertService("S3", "service3", 10);
        let query = "INSERT INTO Queue (service, count) VALUES (?, ?)";
        await dbManager.query(query, ["S1", 4]);
        await dbManager.query(query, ["S2", 1]);
        await dbManager.query(query, ["S3", 2]);
        await counterDAO.insertCounter("counter1", ["S1","S3"]);
        await counterDAO.insertCounter("counter2", ["S2"]);
        await ticketDAO.insertTicket("S1", 5);
        await ticketDAO.insertTicket("S1", 6);
        await ticketDAO.insertTicket("S1", 7);
        await ticketDAO.insertTicket("S3", 3);
        await ticketDAO.insertTicket("S3", 4);

        await expect(counterService.nextCustomer(5)).rejects.toEqual(
            {returnCode: 404, message: "Counter not found"} 
        );

        let counterId = 1;
        const expectedResult1 = {service: "S1", ticket: 5}
        let result = await counterService.nextCustomer(counterId);
        expect(result).toEqual(expectedResult1);
        const queueS1 = await queueDAO.getQueueByService("S1");
        expect(queueS1.count).toStrictEqual(5);
        
        const expectedResult2 = {service: "S3", ticket: 3}
        result = await counterService.nextCustomer(counterId);
        expect(result).toEqual(expectedResult2);
        const queueS3 = await queueDAO.getQueueByService("S3");
        expect(queueS3.count).toStrictEqual(3);
        
        counterId = 2;
        const expectedResult3 = {service: null, ticket: null}
        result = await counterService.nextCustomer(counterId);
        expect(result).toEqual(expectedResult3);

        dbManager.closeConnection();
        await expect(counterService.nextCustomer(1)).rejects.toThrow();
    })

})