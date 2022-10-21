'use strict';

const Counter = require('../dtos/counterDTO');
const crypto = require("crypto");

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

  async insertCounter(user, password, services = []) {
    let query = "INSERT INTO Counter (user, hash, salt) VALUES (?, ?, ?)";
    try {
      const output = await generateSecurePassword(password);
      const counterId = await this.dbManager.query(query, [
        user,
        output[0],
        output[1]
      ]);
      query =
        "INSERT INTO Link_counter_service (counter, service) VALUES (?, ?)";
      for (const s of services) {
        await this.dbManager.query(query, [counterId, s]);
      }
      return counterId;
    } catch (err) {
      throw err;
    }
  }

  async loginUser(user, password) {
    try {
      const sql = "SELECT * FROM Counter WHERE user = ? ";
      const counter = await this.dbManager.get(sql, [user]);
      if (counter === undefined || counter[0] === undefined) {
        // counter does not exist
        throw { err: 401, msg: "Counter not found" };
      }
      const login = await verifyPassword(
        counter[0].hash,
        counter[0].salt,
        password
      );
      if (!login) throw { err: 401, msg: "Invalid password" };
      return new Counter(counter[0].id, counter[0].user);
    } catch (err) {
      throw err;
    }
  }
}

async function generateSecurePassword(password) {
  const buf = crypto.randomBytes(128); // generate random bytes
  const salt = buf.toString("hex"); // convert bytes to hex string (to store in the DB)
  const hash = crypto.createHash("sha256");
  hash.update(password); // generate digest as SHA-256(password | salt)
  hash.update(buf);
  const pwd = hash.digest("hex");
  return [pwd, salt];
}

async function verifyPassword(passwordStored, saltStored, password) {
  const salt = Buffer.from(saltStored, "hex"); // convert saltStored (hex string) to bytes
  const hash = crypto.createHash("sha256");
  hash.update(password); // generate digest as SHA-256(password | salt)
  hash.update(salt);
  const pwd = hash.digest("hex");
  if (pwd === passwordStored)
    // check if digest stored in the DB is equal to digest computed above
    return true;
  return false;
}
module.exports = CounterDAO;
