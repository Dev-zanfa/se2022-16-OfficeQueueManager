'use strict';

const DBManager = require('../database/dbManager');
const ServiceDAO = require('../daos/serviceDAO');
const Service = require('../dtos/serviceDTO');
const { purgeAllTables } = require('./purgeUtils');

const dbManager = new DBManager();
const serviceDAO = new ServiceDAO(dbManager);

describe('Service DAO unit test', () => {
    beforeAll(async () => {
        dbManager.openConnection();
        await purgeAllTables(dbManager);
    });

    beforeEach(() => { 
        dbManager.openConnection(); 
    });

    afterAll(async () => {
       try { dbManager.closeConnection(); }
        catch (err) {/*foo*/ }
    });

    describe('Constructor test', () => {
        expect(() => new ServiceDAO())
            .toThrow('DBManager must be defined for Service dao!');
    });

    const expectedService = new Service("S1", "service1", 15);

    testInsertService("S1", "service1", 15, 1);
    testGetService("S1", expectedService);

});


function testGetService(serviceTag, expectedService) {
    test('test get service', async () => {
        let res = await serviceDAO.getService(serviceTag);
        expect(res.tag).toStrictEqual(expectedService.tag);
        expect(res.name).toStrictEqual(expectedService.name);
        expect(res.serviceTime).toStrictEqual(expectedService.serviceTime);
    });
}

function testInsertService(serviceTag, name, service_time, expectedValue) {
    test('test insert service', async () => {
        let res = await serviceDAO.insertService(serviceTag, name, service_time);
        expect(res).toStrictEqual(expectedValue);
    });
}

