'use strict';

const Queue = require('../dtos/queueDTO');

class QueueDAO {

    constructor(dbManager) {
        if (!dbManager)
            throw 'DBManager must be defined for Queue dao!';
        this.dbManager = dbManager;
    }

    async getQueueByService(serviceTag) {
        const query = "SELECT * FROM Queue WHERE service = ?";
        try {
            const result = await this.dbManager.get(query, [serviceTag], true);
            return new Queue(result.service, result.count);
        } catch (err) {
            throw err;
        }
    }

    async incrementQueueCount(serviceTag){
        const query = "UPDATE Queue SET count = count + 1 WHERE service = ?";
        try {
            const result = await this.dbManager.query(query, [serviceTag]);
        } catch (err) {
            throw err;
        }
    }
    
}

module.exports = QueueDAO;