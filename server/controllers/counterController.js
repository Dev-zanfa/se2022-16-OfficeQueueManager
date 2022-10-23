'use strict'

const CounterDAO = require('../daos/counterDAO');
const TicketDAO = require('./../daos/ticketDAO');
const QueueDAO = require('../daos/queueDAO');
const ServiceDAO = require('../daos/serviceDAO');
const CounterService = require('../services/counterService');


class CounterController {
    constructor(dbManager) {
        const counterDAO = new CounterDAO(dbManager);
        const ticketDAO = new TicketDAO(dbManager);
        const queueDAO = new QueueDAO(dbManager);
        const serviceDAO = new ServiceDAO(dbManager);
        this.service = new CounterService(counterDAO, queueDAO, ticketDAO, serviceDAO);
    }

    async nextCustomer(userid) {
        const genericFailureStatus = 500;
        const genericFailureMessage = "generic failure status";
        let response = {};
        try {
            response.body = await this.service.nextCustomer(userid);
            response.returnCode = 200;
        } catch (err) {
            console.log(err);
            switch(err.returnCode){
                case 404:
                    response.returnCode = 404;
                    response.body = err.message;
                    break
                default:
                    response.returnCode = genericFailureStatus;
                    response.body = genericFailureMessage;
            }
        }
        return response;
    }    

}

module.exports = CounterController;