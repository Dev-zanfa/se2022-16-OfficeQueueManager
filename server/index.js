const express = require("express");
const cors = require("cors");

const PORT = 3001;
app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/`)
);
