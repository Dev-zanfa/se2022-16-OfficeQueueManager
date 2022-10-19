"use strict";

const Service = require("../dtos/serviceDTO");

class ServiceDAO {
  constructor(dbManager) {
    if (!dbManager) throw "DBManager must be defined for Service dao!";
    this.dbManager = dbManager;
  }

  async getService(serviceTag) {
    const query = "SELECT * FROM Service WHERE tag = ?";
    try {
      const result = await this.dbManager.get(query, [serviceTag], true);
      return new Service(result.tag, result.name, result.service_time);
    } catch (err) {
      throw err;
    }
  }

  async getAllServices() {
    const query = "SELECT tag FROM Service";
    try {
      const result = await this.dbManager.get(query);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

module.exports = ServiceDAO;
