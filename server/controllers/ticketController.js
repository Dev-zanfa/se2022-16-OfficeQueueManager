'use strict';

const TicketDAO = require('./../daos/ticketDAO');


class TicketController {
    constructor(dbManager) {
        const ticketDAO = new TicketDAO(dbManager);
        this.service = new TicketService(ticketDAO);
    }

    async addTicket() {

        let response = {};
        try {

            response.body = await this.service.addTicket();
            response.returnCode = 200;
        } catch (err) {
            throw err;
        }

        return response;
    }    

}

module.exports = TicketController;