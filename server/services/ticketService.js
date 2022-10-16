'use strict'

const dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat);

let services = [a,b,c,d];
class TicketService {
    constructor(ticketDAO) {
        if (!ticketDAO)
            throw 'ticketDAO must be defined for ticketService service!';

        this.ticketDAO = ticketDAO;
    }

    async addTicket(service) {
        try {
            if (!services.includes(service)) {
                throw {
                    returnCode: 422,
                    message: 'validation of request body failed'
                };
            }
            const lastNumberforservice = await this.getLastTicketPerService(service);
            let newNumberforservice = lastNumberforservice + 1;
            const response = await this.ticketDAO.insertTicket(service, newNumberforservice);
            return response;
        } catch (err) {
            throw err;
        }
    }

}

module.exports = TicketService;