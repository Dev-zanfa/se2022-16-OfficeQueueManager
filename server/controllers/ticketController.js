'use strict';

const TicketDAO = require('./../daos/ticketDAO');
const TicketService = require('./../services/ticketService');


class TicketController {
    constructor(dbManager) {
        const ticketDAO = new TicketDAO(dbManager);
        this.service = new TicketService(ticketDAO);
    }

    async addTicket(reqBody) {
        const genericFailureStatus = 500;
        const genericFailureMessage = 'generic failure status'
        let response = {};
        try {
            await this.service.addTicket(reqBody.service);
            response.returnCode = 200;
        } catch (err) {
            switch (err.returnCode) {
                case 422:
                    response.returnCode = 422;
                    response.body = err.message;
                    break;
                default:
                    response.returnCode = genericFailureStatus;
                    response.body = genericFailureMessage;
                    break;
            }
        }
        return response;
    }
}

module.exports = TicketController;