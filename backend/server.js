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

// Salesforce OAuth callback redirect
app.get("/auth/callback", (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("Authorization code not found");
  }

  res.redirect(`/api/salesforce/callback?code=${code}`);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});