'use strict'

const CounterDAO = require('../daos/counterDAO');
const CounterService = require('../services/counterService');


class CounterController {
    constructor(dbManager) {
        const counterDAO = new CounterDAO(dbManager);
        this.service = new CounterService(counterDAO);
    }

    async nextCustomer() {
        const genericFailureStatus = 500;
        let response = {};
        try {
            response.body = await this.service.nextCustomer();
            response.returnCode = 200;
        } catch (err) {
            switch(err.returnCode){
                case 4:
                    response.returnCode = 404;
                    response.body = err.message;
                    break
                default:
                    response.returnCode = genericFailureStatus;
                    response.body = {error: err}
            }
            // response.returnCode = genericFailureStatus; 
            // response.body = { error: err }; 
        }
        return response;
    }    

}

module.exports = CounterController;