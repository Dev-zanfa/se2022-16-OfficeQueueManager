'use strict'

class ServiceDTO {
    constructor(tag, name, serviceTime=0) {
        this.tag = tag;
        this.name = name;
        this.serviceTime = serviceTime;
    }
}

module.exports = ServiceDTO;