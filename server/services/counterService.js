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
            const result = {};
            // get counter
            const counter = await this.counterDAO.getCounter(counterId);
            if(counter === undefined)
                throw {returnCode: 404, message: "Counter not found"};
            // get services of counter
            const services = await this.counterDAO.getCounterServices(counterId);
            for (const s of services) {
                const service = await this.serviceDAO.getService(s);
                counter.services.push(service);
            }
            // get queues
            const queues = [];
            for (const service of counter.services) {
                const lastTicket = await this.ticketDAO.getLastTicketPerService(service.tag);
                const queue = await this.queueDAO.getQueueByService(service.tag);
                queue.length = lastTicket - queue.count;
                queues.push(queue);
            }
            
            // longest queue
            let selectedQueue = undefined;
            for (const q of queues) {
                if(selectedQueue === undefined || q.length > selectedQueue.length){
                    selectedQueue = q;
                }
            }

            // service with min service time
            let serviceLowestServiceTime = undefined;
            counter.services.forEach(s => {
                if(serviceLowestServiceTime == undefined || s.serviceTime < serviceLowestServiceTime.serviceTime)
                    serviceLowestServiceTime = s;
            });

            if(selectedQueue.length <= 0){
                // no next ticket
                result.service = null;
                result.ticket = null;
            }
            else{
                // check if two or more queues have the same max length
                if(queues.filter(q => q.length === selectedQueue.length).length !== 1){
                    // select queue with lowest service time
                    selectedQueue = queues.find(q => q.tag === serviceLowestServiceTime.tag);
                }
                // first take next ticket then delete it
                const nextTicket = await this.ticketDAO.getOldestTicket(selectedQueue.tag);
                await this.ticketDAO.deleteOldestTicket(selectedQueue.tag, nextTicket);
                await this.queueDAO.incrementQueueCount(selectedQueue.tag);
                result.service = selectedQueue.tag;
                result.ticket = nextTicket;
            }
            // console.log("############## " + result.service + "  " + result.ticket);
            return result;
        } catch (err) {
            throw err;
        }
    }

}

module.exports = CounterService;