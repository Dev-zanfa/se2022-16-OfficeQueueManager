'use strict'


class TicketService {
    constructor(ticketDAO, queueDAO) {
        if (!ticketDAO)
            throw 'ticketDAO must be defined for ticketService service!';
        else if(!queueDAO)
            throw 'queueDAO must be defined for ticketService service!';
        this.queueDAO=queueDAO;
        this.ticketDAO = ticketDAO;
    }

    async addTicket(service) {
        try {
            //let services = retrieve from database??
            let services = ['a', 'b', 'c', 'd'];
            if (!service || !services.includes(service)) {
                throw {
                    returnCode: 422,
                    message: 'validation of request body failed, service does not exists'
                };
            }
            let newNumberforservice=0;
            const lastNumberforservice = await this.ticketDAO.getLastTicketPerService(service);
            const queueLen = await this.queueDAO.getQueueByService(service);

            (lastNumberforservice==0 && queueLen!=0) ? newNumberforservice = queueLen +1  : newNumberforservice = lastNumberforservice + 1 ;
            
            const response = await this.ticketDAO.insertTicket(service, newNumberforservice);
            return response;
        } catch (err) {
            throw err;
        }
    }

}

module.exports = TicketService;