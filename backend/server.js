const express = require("express");
const cors = require("cors");
require("dotenv").config();

console.log("🔥 BACKEND STARTED FROM:", __dirname);


const salesforceRoutes = require("./routes/salesforce");

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log("HIT:", req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.send("Salesforce Validation Manager Backend Running");
});

app.use("/api/salesforce", salesforceRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});



