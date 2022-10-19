'use strict'

class QueueDTO {
    constructor(tag, count, length=0) {
       this.tag = tag;
       this.count = count;
       this.length = 0;
    }
}

module.exports = QueueDTO;