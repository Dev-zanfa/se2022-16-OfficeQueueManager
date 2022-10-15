const express = require("express");
// const validator = require("express-validator");
const cors = require("cors");
const DBManager = require("./database/dbManager");
const TicketController = require("./controllers/ticketController");
const PORT = 3001;
app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

const dbManager = new DBManager();
dbManager.openConnection();

//API
app.post('/api/ticket', async(req,res) => {
  const genericFailureStatus = 500;
  let response={}
  try {
    const ticketController = new TicketController(dbManager);
    response = await ticketController.addTicket();
  }catch(err){
    response.returnCode = genericFailureStatus;
    response.body = {error: err};
  }
  return res.status(response.returnCode).json(response.body);
})
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/`)
);
