'use strict'

class CounterService {
    constructor(counterDAO, queueDAO, ticketDAO, serviceDAO) {
        if (!counterDAO)
            throw 'counterDAO must be defined for counter service!';
        if (!queueDAO)
            throw 'queueDAO must be defined for counter service!';
        if (!ticketDAO)
            throw 'ticketDAO must be defined for counter service!';
        if (!serviceDAO)
            throw 'serviceDAO must be defined for counter service!';

        this.counterDAO = counterDAO;
        this.queueDAO = queueDAO;
        this.ticketDAO = ticketDAO;
        this.serviceDAO = serviceDAO;
    }

    async nextCustomer(counterId) {
        try {
            //get counter
            const counter = await this.counterDAO.getCounter(counterId);
            if(counter === undefined)
                throw {returnCode: 4, message: "Counter not found"};
            //get services of counter
            const services = await this.counterDAO.getCounterServices(counterId);
            for (const s of services) {
                const service = await this.serviceDAO.getService(s);
                counter.services.append(service);
            }
            // get queues
            const queues = [];
            for (const service of counter.services) {
                let queue = await this.queueDAO.getQueueByService(service);
                queues.append(queue);
            }
            
            // longest queue
            let maxQueue = undefined;
            queues.forEach(q => {
                if(maxQueue === undefined || q.count > maxQueue.count)
                    maxQueue = q;
            });

            // service with min service time
            let serviceLowestServiceTime = undefined;
            counter.services.forEach(s => {
                if(serviceLowestServiceTime == undefined || s.serviceTime < serviceLowestServiceTime)
                    serviceLowestServiceTime = s;
            });

            // TODO: get next ticket
            if(maxQueue == 0){
                // no next ticket
            }
            // check if two or more queues have the same max length
            else if(queues.filter(q => q.count = maxQueue.count).length() != 1){
                const selectedQueue = queues.find(q => q.tag === serviceLowestServiceTime.tag);
                // get next ticket from selectedQueue
            }
            else{
                //get next ticket from maxQueue

            }
            
            return response;
        } catch (err) {
            throw err;
        }
    }

}

module.exports = CounterService;