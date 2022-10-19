'use strict'


class TicketService {
    constructor(ticketDAO) {
        if (!ticketDAO)
            throw 'ticketDAO must be defined for ticketService service!';

        this.ticketDAO = ticketDAO;
    }

    async addTicket(service) {
        try {
            //let services = retrieve from database??
            let services = ['S1', 'S2', 'S3'];
            if (!service || !services.includes(service)) {
                throw {
                    returnCode: 422,
                    message: 'validation of request body failed, service does not exists'
                };
            }
            const lastNumberforservice = await this.ticketDAO.getLastTicketPerService(service);
            let newNumberforservice = lastNumberforservice + 1;
            const response = await this.ticketDAO.insertTicket(service, newNumberforservice);
            return response;
        } catch (err) {
            throw err;
        }
    }

}

module.exports = TicketService;