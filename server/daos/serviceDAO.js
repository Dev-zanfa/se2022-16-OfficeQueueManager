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
            return result ? new Service(result.tag, result.name, result.service_time) : undefined;
        } catch (err) {
            throw err;
        }
    }

    async insertService(serviceTag, name, service_time){
        const query = "INSERT INTO Service (tag, name, service_time) VALUES (?, ?, ?)";
        try {
            const result = await this.dbManager.query(query, [serviceTag, name, service_time]);
            return result;
        } catch (err) {
            throw err;
        }
    }
    
    async getAllServices() {
      const query = "SELECT * FROM Service";
      try {
        const result = await this.dbManager.get(query);
        return result.map(elem=>new Service(elem.tag,elem.name,elem.service_time));
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
}

module.exports = ServiceDAO;
