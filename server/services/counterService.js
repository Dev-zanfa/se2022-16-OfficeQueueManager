'use strict'

class CounterService {
    constructor(counterDAO, queueDAO, ticketDAO) {
        if (!counterDAO)
            throw 'counterDAO must be defined for counter service!';
        if (!queueDAO)
            throw 'queueDAO  must be defined for counter service!';
        if (!ticketDAO)
            throw 'ticketDAO  must be defined for counter service!';

        this.counterDAO = counterDAO;
        this.queueDAO = queueDAO;
        this.ticketDAO = ticketDAO;
    }

    async nextCustomer(counterId) {
        try {
            const counter = await this.counterDAO.getCounter(counterId);
            if(counter == undefined)
                throw {returnCode: 4, message: "Counter not found"};
            counter.services = await this.counterDAO.getCounterServices(counterId);

            


            return response;
        } catch (err) {
            throw err;
        }
    }

}

module.exports = CounterService;