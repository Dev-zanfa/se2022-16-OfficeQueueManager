'use strict';

const Queue = require('../dtos/queueDTO');

class QueueDAO {

    constructor(dbManager) {
        if (!dbManager)
            throw 'DBManager must be defined for Queue dao!';
        this.dbManager = dbManager;
    }

    async getQueueByService(serviceTag) {
        const query = "SELECT * FROM Queue WHERE tag = ?";
        try {
            const result = await this.dbManager.get(query, [serviceTag], true);
            return new Queue(result.service, result.count);
        } catch (err) {
            throw err;
        }
    }
    
}

module.exports = QueueDAO;