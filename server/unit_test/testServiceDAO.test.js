'use strict';

const DBManager = require('../database/dbManager');
const ServiceDAO = require('../daos/serviceDAO');
const Service = require('../dtos/serviceDTO');


const dbManager = new DBManager(true);
// dbManager.openConnection();
const serviceDAO = new ServiceDAO(dbManager);

describe('Test Get Service', () => {
    beforeAll(async () => {
        dbManager.openConnection();
    });

    afterAll(async () => {
        dbManager.closeConnection();
    });

    const expectedService1 = new Service("S1", "service1", 15);
    const expectedService2 = new Service("S2", "service2", 20);

    testGetService("S1", expectedService1);
    testGetService("S2", expectedService2);

});


function testGetService(serviceTag, expectedService) {
    test('get service', async () => {
        let res = await serviceDAO.getService(serviceTag);
        expect(res.tag).toStrictEqual(expectedService.tag);
        expect(res.name).toStrictEqual(expectedService.name);
        expect(res.serviceTime).toStrictEqual(expectedService.serviceTime);
    });
}

