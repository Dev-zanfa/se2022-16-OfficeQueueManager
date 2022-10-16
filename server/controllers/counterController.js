'use strict'

const CounterDAO = require('../daos/counterDAO');
const TicketDAO = require('./../daos/ticketDAO');
const QueueDAO = require('../daos/queueDAO');
const CounterService = require('../services/counterService');


class CounterController {
    constructor(dbManager) {
        const counterDAO = new CounterDAO(dbManager);
        const ticketDAO = new TicketDAO(dbManager);
        const queueDAO = new QueueDAO(dbManager);
        this.service = new CounterService(counterDAO, queueDAO, ticketDAO);
    }

    async nextCustomer() {
        const genericFailureStatus = 500;
        const genericFailureMessage = "generic failure status";
        let response = {};
        try {
            response.body = await this.service.nextCustomer();
            response.returnCode = 200;
        } catch (err) {
            switch(err.returnCode){
                case 4:
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