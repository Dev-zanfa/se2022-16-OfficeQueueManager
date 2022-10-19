const express = require("express");
// const validator = require("express-validator");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const DBManager = require("./database/dbManager");
const TicketController = require("./controllers/ticketController");
const CounterController = require("./controllers/counterController");

const PORT = 3001;
app = express();

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(
  session({
    secret: "with great powers comes great responsabilities",
    resave: false,
    saveUninitialized: false,
  })
);

passport.use(
  new LocalStrategy(async function verify(username, password, callback) {
    const user = await ""; //TODO: call here login method passing username and password
    if (!user)
      return callback(null, false, {
        message: "Incorrect username and/or password.",
      });
    return callback(null, user);
  })
);

passport.serializeUser((user, cb) => {
  //here we can decide which attribute serialize
  cb(null, {
    id: user.id,
    user: user.user,
  });
});
passport.deserializeUser((user, cb) => {
  return cb(null, user);
});

app.use(passport.authenticate("session"));

//Middleware to check if a user is logged
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).send("Not authenticated");
};

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ user: req.user });
});

app.post("/logout", (req, res) => {
  if (req.isAuthenticated())
    req.logout(() => {
      res.end();
    });
  else res.end();
});

// DB
const dbManager = new DBManager();
dbManager.openConnection();

//Controllers
const counterController = new CounterController(dbManager);


//API
app.post('/api/ticket', async (req, res) => {
  const ticketController = new TicketController(dbManager);
  response = await ticketController.addTicket(req.body);
  return res.status(response.returnCode).json(response.body);
})


app.get('/api/counter/:userid/nextcustomer', async(req,res) => {
  let response = await counterController.nextCustomer(req.params.userid);
  return res.status(response.returnCode).json(response.body);
})


app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/`)
);
