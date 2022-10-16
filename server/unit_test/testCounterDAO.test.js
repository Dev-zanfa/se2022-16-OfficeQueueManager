'use strict';

const DBManager = require('../database/dbManager');
const CounterDAO = require('../daos/counterDAO');
const Counter = require('../dtos/counterDTO');


const dbManager = new DBManager();
const counterDAO = new CounterDAO(dbManager);

describe('Test Get Counter', () => {
    beforeAll(async () => {
        dbManager.openConnection();
    });

    afterAll(async () => {
        dbManager.closeConnection();
    });

    const expectedServices = ["S1", "S3"];
    const expectedCounter = new Counter(1, "counter1", expectedServices);
    testInsertCounter("counter1", 1);
    testGetCounter(1, expectedCounter);
    testGetCounterServices(1, expectedServices);

});


function testInsertCounter(user, expectedID) {
    test('insert new counter', async () => {
        let id = await counterDAO.insertCounter(user, services);
        expect(id).toStrictEqual(expectedID);
    });
}

function testGetCounter(counterId, expectedCounter) {
    test('get counter', async () => {
        let res = await counterDAO.getCounter(skuID);
        expect(res.id).toStrictEqual(expectedCounter.id);
        expect(res.user).toStrictEqual(expectedCounter.user);
    });
}

function testGetCounterServices(counterId, expectedServices) {
    test('get services of counter', async () => {
        let res = await counterDAO.getCounterServices(counterId);
        expect(res).toStrictEqual(expectedServices);
    });
}

function testGetCounterError(counterId, expectedError){
    test('throw error on get Counter', async () => {
        async function getNonExistentCounter(){
            await counterDAO.getCounter(counterId); 
        };
        await expect(getNonExistentCounter).rejects.toEqual(expectedError);
    });
}



