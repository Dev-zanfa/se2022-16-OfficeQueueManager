'use strict'

class LoginService {
    constructor(counterDAO) {
        if (!counterDAO)
            throw 'counterDAO must be defined for counter service!';

        this.counterDAO = counterDAO;
    }

    async login(id, password) {
        try {
            const result = {};
            // get counter
            const counter = await this.counterDAO.loginUser(id, password);
            if(counter === undefined)
                throw {returnCode: 4, message: "Counter not found"};
        } catch (err) {
            throw err;
         }
    }

}

module.exports = LoginService;