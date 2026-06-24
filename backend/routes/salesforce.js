const express = require("express");
console.log("LOADED SALESFORCE ROUTES FILE");
const axios = require("axios");
const crypto = require("crypto");
const jsforce = require("jsforce")

const router = express.Router();

let codeVerifier = "";
let accessToken = "";
let instanceUrl = "";
let conn = null;

router.get("/status", (req, res) => {
res.json({
success: true,
message: "Salesforce route working"
});
});

router.get("/login", (req, res) => {
codeVerifier = crypto.randomBytes(32).toString("hex");

const codeChallenge = crypto
  .createHash("sha256")
  .update(codeVerifier)
  .digest("base64")
  .replace(/\+/g, "-")
  .replace(/\//g, "_")
  .replace(/=/g, "");

const authUrl =
  `${process.env.SF_LOGIN_URL}/services/oauth2/authorize` +
  `?response_type=code` +
  `&client_id=${process.env.SF_CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(process.env.SF_CALLBACK_URL)}` +
  `&code_challenge=${codeChallenge}` +
  `&code_challenge_method=S256`;

res.redirect(authUrl);
});

router.get("/callback", async (req, res) => {
try {
const { code } = req.query;

const tokenResponse = await axios.post(
  `${process.env.SF_LOGIN_URL}/services/oauth2/token`,
  null,
  {
    params: {
      grant_type: "authorization_code",
      code,
      client_id: process.env.SF_CLIENT_ID,
      client_secret: process.env.SF_CLIENT_SECRET,
      redirect_uri: process.env.SF_CALLBACK_URL,
      code_verifier: codeVerifier
    }
  }
);

accessToken = tokenResponse.data.access_token;
instanceUrl = tokenResponse.data.instance_url;
conn = new jsforce.Connection({ instanceUrl, accessToken });

console.log("TOKEN SAVED:", accessToken ? "YES" : "NO");

console.log("INSTANCE URL:", instanceUrl);

res.json({
  success: true,
  message: "Salesforce Login Successful",
  instance_url: instanceUrl
});

} catch (error){
  console.error(error.response?.data || error.message);

  res.status(500).json({
    success: false,
    error: error.response?.data || error.message
});

}
});

router.get("/validation-rules", async (req, res) => {
  try {

  if (!accessToken){
    return res.status(401).json({
      success:false,
      message: "please login to salesforce first"
    });
  }

    const response = await axios.get(
      `${instanceUrl}/services/data/v64.0/tooling/query`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: {
          q: `
            SELECT Id,
                   ValidationName,
                   Active,
                   EntityDefinition.QualifiedApiName
            FROM ValidationRule
          `
        }
      }
    );

    res.json(response.data.records);

  } catch (error) {

    console.error(
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      error:
        error.response?.data || error.message
    });

  }
});

router.get("/connection-test", async (req, res) => {
try {

if (!conn) {
  return res.status(401).json({
    success: false,
    message: "Please login first"
  });
}

const identity = await conn.identity();

res.json({
  success: true,
  username: identity.username,
  organiizationid: identity.organization_id
});
} catch(error) {

res.status(500).json({
  success: false,
  error: error.message
});

}
});

router.get("/rule-details/:name", async (req, res) => {
  try {

    if (!conn) {
      return res.status(401).json({
        success: false,
        message: "Please login first"
      });
    }

    const ruleName = req.params.name;

    const result = await conn.tooling.query(
      `SELECT Id,
              ValidationName,
              Active,
              ErrorMessage
       FROM ValidationRule
       WHERE ValidationName='${ruleName}'`
    );

    res.json(result.records);

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
});

router.get("/test123", (req, res) => {
  res.json({
    success: true,
    message: "test route working"
  });
});

module.exports = router;

