"use strict";

const Queue = require("../dtos/queueDTO");

class QueueDAO {
  constructor(dbManager) {
    if (!dbManager) throw "DBManager must be defined for Queue dao!";
    this.dbManager = dbManager;
  }

  async getQueueByService(serviceTag) {
    const query = "SELECT * FROM Queue WHERE service = ?";
    try {
      const result = await this.dbManager.get(query, [serviceTag], true);
      return result ? new Queue(result.service, result.count) : undefined;
    } catch (err) {
      throw err;
    }
  }

  async incrementQueueCount(serviceTag) {
    const query = "UPDATE Queue SET count = count + 1 WHERE service = ?";
    try {
      const result = await this.dbManager.query(query, [serviceTag]);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async resetQueues() {
    const query = "UPDATE Queue SET count=0";
    try {
      await this.dbManager.query(query);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = QueueDAO;
