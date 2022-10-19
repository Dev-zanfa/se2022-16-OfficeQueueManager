"use strict";

const QueueDAO = require("../daos/queueDAO");
const ServiceDAO = require("../daos/serviceDAO");
const TicketDAO = require("./../daos/ticketDAO");
const TicketService = require("./../services/ticketService");

class TicketController {
  constructor(dbManager) {
    const ticketDAO = new TicketDAO(dbManager);
    const serviceDAO = new ServiceDAO(dbManager);
    const queueDao = new QueueDAO(dbManager);

    this.service = new TicketService(ticketDAO, serviceDAO, queueDao);
  }

  async addTicket(reqBody) {
    const genericFailureStatus = 500;
    const genericFailureMessage = "generic failure status";
    let response = {};
    try {
      await this.service.addTicket(reqBody.service);
      response.returnCode = 200;
    } catch (err) {
      switch (err.returnCode) {
        case 422:
          response.returnCode = 422;
          response.body = err.message;
          break;
        default:
          response.returnCode = genericFailureStatus;
          response.body = genericFailureMessage;
          break;
      }
    }
    return response;
  }
}

module.exports = TicketController;
