'use strict';

const TicketDAO = require('./../daos/ticketDAO');


class TicketController {
    constructor(dbManager) {
        const ticketDAO = new TicketDAO(dbManager);
        this.service = new TicketService(ticketDAO);
    }

    async addTicket() {
        const genericFailureStatus = 500;
        const genericFailureMessage = 'generic failure status'
        let response = {};
        try {
            response.body = await this.service.addTicket();
            response.returnCode = 200;
        } catch (err) {
            switch(err.returnCode){
                case 422:
                    response.returnCode = 422;
                    response.body = err.message;
                default:
                    response.returnCode = genericFailureStatus;
                    response.body = genericFailureMessage;
            }
        }
        return response;
    }    
}

module.exports = TicketController;