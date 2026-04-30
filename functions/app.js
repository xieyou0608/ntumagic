const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send("ntumagic API (Firebase Functions)");
});

app.use("/api/seats", require("./routes/seats"));
app.use("/api/audience", require("./routes/audience"));
app.use("/api/admin", require("./routes/admin"));

// Express 預設的 fall-through 404
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Not found" });
});

module.exports = app;
