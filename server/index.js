const express = require("express");
// const validator = require("express-validator");
const cors = require("cors");
const DBManager = require("./database/dbManager");
const TicketController = require("./controllers/ticketController");
const CounterController = require("./controllers/counterController");
const BatchController = require("./controllers/batchController");

const PORT = 3001;
app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

// DB
const dbManager = new DBManager();
dbManager.openConnection();

//Controllers
const counterController = new CounterController(dbManager);
const ticketController = new TicketController(dbManager);
const batchController = new BatchController(dbManager);
batchController.reset();

//API
app.post("/api/ticket", async (req, res) => {
  response = await ticketController.addTicket(req.body);
  return res.status(response.returnCode).json(response.body);
});

app.get("/api/counter/:userid/nextcustomer", async (req, res) => {
  let response = await counterController.nextCustomer(req.params.userid);
  return res.status(response.returnCode).json(response.body);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/`)
);
