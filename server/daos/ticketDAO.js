"use strict";

const Ticket = require("../dtos/ticketDTO");

class TicketDAO {
  constructor(dbManager) {
    if (!dbManager) throw "DbManager must be defined for DAO layer!";
    this.dbManager = dbManager;
  }

  async insertTicket(service, number) {
    const query = "INSERT INTO Ticket (service, number) VALUES (?,?)";
    try {
      const result = await this.dbManager.query(query, [service, number]);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async getLastTicketPerService(service) {
    const query =
      "SELECT number FROM Ticket WHERE service = ? ORDER BY number DESC LIMIT 1 ";

    try {
      const result = await this.dbManager.get(query, [service]);
      return result[0] ? result[0].number : 0;
    } catch (err) {
      throw err;
    }
  }

  async countTicketPerService(service) {
    const query = "SELECT Count(*) as count FROM Ticket WHERE service = ?";
    try {
      const result = await this.dbManager.get(query, [service]);
      return result[0].count > 0;
    } catch (err) {
      throw err;
    }
  }

  async getOldestTicket(service) {
    const query =
      "SELECT number FROM Ticket WHERE service = ? ORDER BY number LIMIT 1 ";

    try {
      const result = await this.dbManager.get(query, [service]);
      return result[0] ? result[0].number : 0;
    } catch (err) {
      throw err;
    }
  }

  async deleteOldestTicket(service, number) {
    const query = "DELETE FROM Ticket WHERE service = ? AND number = ? ";

    try {
      const result = await this.dbManager.get(query, [service, number]);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = TicketDAO;
