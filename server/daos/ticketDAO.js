'use strict';

const Ticket = require('../dtos/ticketDTO');

class TicketDAO {

    constructor(dbManager) {
        if (!dbManager)
            throw 'DbManager must be defined for SKU data layer!';

        this.dbManager = dbManager;
    }


    async insertTicket( ) {
        const query = '';

        try {
            const result = await this.dbManager.query(query, []);
            return result;
        } catch (err) {
            throw err;
        }

    }
    
}

module.exports = TicketDAO;