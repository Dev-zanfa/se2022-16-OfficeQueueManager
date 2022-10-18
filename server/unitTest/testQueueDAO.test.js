'use strict';

const DBManager = require('../database/dbManager');
const QueueDAO = require('../daos/queueDAO');
const Queue = require('../dtos/queueDTO');


const dbManager = new DBManager(true);
// dbManager.openConnection();
const queueDAO = new QueueDAO(dbManager);

describe('Test get queue', () => {
    beforeAll(async () => {
        dbManager.openConnection();
    });

    afterAll(async () => {
        dbManager.closeConnection();
    });

    const expectedQueue1 = new Queue("S1", 4);
    const expectedQueue2 = new Queue("S2", 1);
    
    testGetQueueByService("S1", expectedQueue1);
    testGetQueueByService("S2", expectedQueue2);
});


describe('Test increment queue count', () => {
    beforeAll(async () => {
        dbManager.openConnection();
    });

    afterAll(async () => {
        dbManager.closeConnection();
    });

    const expectedQueue1 = new Queue("S1", 4);
    const expectedQueue2 = new Queue("S1", 5);
    
    testGetQueueByService("S1", expectedQueue1);
    testIncrementQueueCount("S1", 1);
    testGetQueueByService("S1", expectedQueue2);
});


function testGetQueueByService(serviceTag, expectedQueue) {
    test('get queue by service', async () => {
        let res = await queueDAO.getQueueByService(serviceTag);
        expect(res.tag).toStrictEqual(expectedCounter.tag);
        expect(res.count).toStrictEqual(expectedCounter.count);
    });
}

function testIncrementQueueCount(serviceTag, expectedValue) {
    test('increment queue count', async () => {
        let res = await counterDAO.getCounterServices(counterId);
        expect(res).toStrictEqual(expectedValue);
    });
}




