'use strict';

const Counter = require('../dtos/counterDTO');

class CounterDAO {

    constructor(dbManager) {
        if (!dbManager)
            throw 'DBManager must be defined for Counter dao!';
        this.dbManager = dbManager;
    }

    async getCounter(id) {
        const query = "SELECT * FROM Counter WHERE id = ?";
        try {
            const result = await this.dbManager.get(query, [id], true);
            return new Counter(result.id, result.user);
        } catch (err) {
            throw err;
        }
    }

    async getCounterServices(id) {
        const query = "SELECT L.service FROM Counter C, Link_counter_service L WHERE C.id = ? AND C.id = L.counter";
        try {      
            const result = await this.dbManager.get(query, [id], false);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async insertCounter(user, services=[]){
        let query = "INSERT INTO Counter (user, hash, salt) VALUE (?, ?, ?)";
        try {
            // TODO: add correct hash, salt
            const counterId = await this.dbManager.query(query, [user, Math.random().toString().substring(2, 8), Math.random().toString().substring(2, 8)]);
            query = "INSERT INTO Link_counter_service (counter, service) VALUE (?, ?)";
            for (const s of services) {
                const res = await this.dbManager.query(query, [counterId, s]);
            }
            return counterId;
        } catch (err) {
            throw err;
        }
    }


    loginUser = async (user, password) => {
        try{
            const sql = "SELECT * FROM Counter WHERE user = ? ";
            const counter = await this.connectionDB.DBget(sql, [user]);
            if(counter === undefined){       // counter does not exist
                throw {err : 401, msg : "Counter not found" };
            }
            const login = await verifyPassword(counter.hash, counter.salt, password);
            if(!login)
                throw {err : 401, msg : "Invalid password" };
            return new Counter(counter.id, counter.user);
        }
        catch(err){
            throw err;
        }
    }
}



    /*
    const generateSecurePassword = async (password) => {
        const buf = crypto.randomBytes(128);            // generate random bytes
        const salt = buf.toString('hex');               // convert bytes to hex string (to store in the DB)
        const hash = crypto.createHash('sha256');
        hash.update(password);                          // generate digest as SHA-256(password | salt)
        hash.update(buf);
        const pwd = hash.digest('hex');
        return {"pwd": pwd, "salt": salt};
    }*/
    
    const verifyPassword = async (passwordStored, saltStored, password) => {
        const salt = Buffer.from(saltStored, 'hex');    // convert saltStored (hex string) to bytes
        const hash = crypto.createHash('sha256');
        hash.update(password);                          // generate digest as SHA-256(password | salt)
        hash.update(salt);
        const pwd = hash.digest('hex');
        if(pwd === passwordStored)             // check if digest stored in the DB is equal to digest computed above
            return true;
        return false;
    }



module.exports = CounterDAO;