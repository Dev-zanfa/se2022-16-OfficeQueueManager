'use strict'

class counterDTO {
    constructor(id, user, services=[]) {
       this.id = id;
       this.user = user;
       this.services = services;
    }
}

module.exports = counterDTO;