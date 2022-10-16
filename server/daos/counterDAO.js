'use strict';

const { query } = require('express');
const Counter = require('../dtos/counterDTO');

class CounterDAO {

    constructor(dbManager) {
        if (!dbManager)
            throw 'DBManager must be defined for Counter dao!';
        this.dbManager = dbManager;
    }

    async getCounter(id) {
        const query = "SELECT * FROM Counter WHERE id = ?";
        try {
            const result = await this.dbManager.get(query, [id], true);
            return new Counter(result.id, result.user);
        } catch (err) {
            throw err;
        }
    }

    async getCounterServices(id) {
        const query = "SELECT L.service FROM Counter C, Link_counter_service L WHERE C.id = ? AND C.id = L.counter";
        try {      
            const result = await this.dbManager.get(query, [id], false);
            return result;
        } catch (err) {
            throw err;
        }
    }
    
}

module.exports = TicketDAO;