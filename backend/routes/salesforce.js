const express = require("express");
const router = express.Router();

router.get("/status", (req, res) => {
  res.json({
    success: true,
    message: "Salesforce route working"
  });
});

router.get("/validation-rules", (req, res) => {
  res.json([
    {
      name: "Account_Name_Required",
      active: true
    },
    {
      name: "Phone_Required",
      active: true
    },
    {
      name: "Billing_Country_Required",
      active: true
    },
    {
      name: "Revenue_Positive",
      active: true
    },
    {
      name: "Website_HTTPS",
      active: true
    }
  ]);
});

router.get("/login", (req, res) => {
  res.json({
    success: true,
    message: "Salesforce Login Endpoint Ready"
  });
});

module.exports = router;