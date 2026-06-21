const express = require("express");
const cors = require("cors");
require("dotenv").config();

const salesforceRoutes = require("./routes/salesforce");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Salesforce Validation Manager Backend Running");
});

app.use("/api/salesforce", salesforceRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});