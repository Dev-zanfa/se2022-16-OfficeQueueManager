'use strict';

const DBManager = require('../database/dbManager');
const QueueDAO = require('../daos/queueDAO');
const Queue = require('../dtos/queueDTO');
const { purgeAllTables } = require('./purgeUtils');

const dbManager = new DBManager();
const queueDAO = new QueueDAO(dbManager);

describe('Queue DAO unit test', () => {
    beforeAll(async () => {
        dbManager.openConnection();
        await purgeAllTables(dbManager);
        let query = "INSERT INTO Queue (service, count) VALUES (?, ?)";
        await dbManager.query(query, ["S1", 4]);
    });

    beforeEach(() => { 
        dbManager.openConnection(); 
    });

    afterAll(async () => {
        try { dbManager.closeConnection(); }
        catch (err) {/*foo*/ }
    });

    const expectedQueue1 = new Queue("S1", 4);
    const expectedQueue2 = new Queue("S1", 5);
    
    testGetQueueByService("S1", expectedQueue1);
    testIncrementQueueCount("S1", 0);
    testGetQueueByService("S1", expectedQueue2);

});

function testGetQueueByService(serviceTag, expectedQueue) {
    test('test get queue by service', async () => {
        let res = await queueDAO.getQueueByService(serviceTag);
        expect(res.tag).toStrictEqual(expectedQueue.tag);
        expect(res.count).toStrictEqual(expectedQueue.count);
    });
}

function testIncrementQueueCount(serviceTag, expectedValue) {
    test('test increment queue count', async () => {
        let res = await queueDAO.incrementQueueCount(serviceTag);
        expect(res).toStrictEqual(expectedValue);
    });
}

