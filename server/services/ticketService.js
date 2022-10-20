"use strict";

class TicketService {
  constructor(ticketDAO, serviceDao, queueDao) {
    if (!ticketDAO)
      throw "ticketDAO must be defined for ticketService service!";
    if (!serviceDao)
      throw "serviceDao must be defined for ticketService service!";
    if (!queueDao) throw "queueDao must be defined for ticketService service!";

    this.ticketDAO = ticketDAO;
    this.serviceDao = serviceDao;
    this.queueDao = queueDao;
  }

  async addTicket(service) {
    try {
      let services = await this.serviceDao.getAllServices();
      //let services = ['a', 'b', 'c', 'd'];
      if (!service || !services.map((elem) => elem.tag).includes(service)) {
        throw {
          returnCode: 422,
          message: "validation of request body failed, service does not exists",
        };
      }
      const areThereAnyTicket = await this.ticketDAO.countTicketPerService(
        service
      );
      const lastNumberforservice = areThereAnyTicket
        ? await this.ticketDAO.getLastTicketPerService(service)
        : (await this.queueDao.getQueueByService(service)).count;
      let newNumberforservice = lastNumberforservice + 1;
      const response = await this.ticketDAO.insertTicket(
        service,
        newNumberforservice
      );
      return newNumberforservice;
    } catch (err) {
      throw err;
    }
  }

  async getAllServices() {
    try {
      return await this.serviceDao.getAllServices();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = TicketService;
