'use strict'

const CounterDAO = require('../daos/counterDAO');

class LoginController {
    constructor(dbManager) {
        const counterDAO = new CounterDAO(dbManager);
        this.service = new LoginService(counterDAO);
    }

    async login(userid) {
        const genericFailureStatus = 500;
        const genericFailureMessage = "generic failure status";
        let response = {};
        try {
            response.body = await this.service.login(userid);
            response.returnCode = 200;
        } catch (err) {
            console.log(err);
            switch(err.returnCode){
                case 4:
                    response.returnCode = 404;
                    response.body = err.message;
                    break
                default:
                    response.returnCode = genericFailureStatus;
                    response.body = genericFailureMessage;
            }
        }
        return response;
    }    

}

module.exports = LoginController;


