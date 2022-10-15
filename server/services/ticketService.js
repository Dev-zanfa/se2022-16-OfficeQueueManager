'use strict'

const dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat);

class TicketService {
    constructor(ticketDAO) {
        if (!ticketDAO)
            throw 'ticketDAO must be defined for ticketService service!';

        this.ticketDAO = ticketDAO;
    }

    async addTicket( ) {
        try {
            //if ( check on function paramaters) {
                throw {
                    // returnCode: 22,
                    // message: 'validation of request body failed'
                // };
            }

            const response = await this.ticketDAO.insertTicket(   );
            return response;

        } catch (err) {
            throw err;
        }
    }

}

module.exports = TicketService;