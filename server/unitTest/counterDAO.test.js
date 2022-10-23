const DBManager = require('../database/dbManager');
const CounterDAO = require('../daos/counterDAO');
const Counter = require('../dtos/counterDTO');
const { purgeAllTables } = require('./purgeUtils');

const dbManager = new DBManager();
const counterDAO = new CounterDAO(dbManager);

describe('Counter DAO unit test', () => {
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
        expect(() => new CounterDAO())
            .toThrow('DBManager must be defined for Counter dao!');
    });

    const expectedServices = ["S1", "S3"];
    const expectedCounter = new Counter(1, "counter1", expectedServices);
    testInsertCounter("counter1", expectedServices, 1);
    testGetCounter(1, expectedCounter);
    testGetCounterServices(1, expectedServices);
});


function testInsertCounter(user, services, expectedID) {
    test('test insert counter', async () => {
        let id = await counterDAO.insertCounter(user, services);
        expect(id).toStrictEqual(expectedID);
    });
    let id = await counterDAO.insertCounter(user, user, services);
}

function testGetCounter(counterId, expectedCounter) {
    test('test get counter', async () => {
        let res = await counterDAO.getCounter(counterId);
        expect(res.id).toStrictEqual(expectedCounter.id);
        expect(res.user).toStrictEqual(expectedCounter.user);
    });
}

function testGetCounterServices(counterId, expectedServices) {
    test('test get services of counter', async () => {
        let res = await counterDAO.getCounterServices(counterId);
        expect(res).toEqual(expectedServices);
    });
}




