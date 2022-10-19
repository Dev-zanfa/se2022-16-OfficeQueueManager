"use strict";

const TicketDAO = require("../daos/ticketDAO");
const QueueDAO = require("../daos/queueDAO");

class BatchController {
  constructor(dbManager) {
    this.ticketDAO = new TicketDAO(dbManager);
    this.queueDAO = new QueueDAO(dbManager);
  }

  async reset() {
    await this.ticketDAO.deleteAllickets();
    await this.queueDAO.resetQueues();
  }
}

module.exports = BatchController;
