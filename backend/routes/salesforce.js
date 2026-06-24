const express = require("express");
console.log("LOADED SALESFORCE ROUTES FILE");

const axios = require("axios");
const crypto = require("crypto");
const jsforce = require("jsforce");

const router = express.Router();

let codeVerifier = "";
let accessToken = "";
let instanceUrl = "";
let conn = null;

/* ---------------- STATUS ---------------- */
router.get("/status", (req, res) => {
  res.json({
    success: true,
    message: "Salesforce route working"
  });
});

/* ---------------- LOGIN ---------------- */
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

/* ---------------- CALLBACK ---------------- */
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

    conn = new jsforce.Connection({
      instanceUrl,
      accessToken
    });

    res.json({
      success: true,
      message: "Salesforce Login Successful",
      instance_url: instanceUrl
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
});

/* ---------------- GET VALIDATION RULES ---------------- */
router.get("/validation-rules", async (req, res) => {
  try {
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Please login first"
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
            SELECT Id, ValidationName, Active,
                   EntityDefinition.QualifiedApiName
            FROM ValidationRule
          `
        }
      }
    );

    res.json(response.data.records);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
});

/* ---------------- CONNECTION TEST ---------------- */
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
      organizationId: identity.organization_id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/* ---------------- RULE DETAILS ---------------- */
router.get("/rule-details/:name", async (req, res) => {
  try {
    if (!conn) {
      return res.status(401).json({
        success: false,
        message: "Please login first"
      });
    }

  const result = await conn.tooling.query(
  `SELECT Id,
          ValidationName,
          Active,
          ErrorMessage,
          ValidationFormula
   FROM ValidationRule
   WHERE ValidationName='${req.params.name}'`
);

    res.json(result.records);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.patch("/toggle-rule/:id", async (req, res) => {
  try {
    if (!conn) {
      return res.status(401).json({
        success: false,
        message: "Please login first"
      });
    }

    const ruleId = req.params.id;
    const { active } = req.body;

    // Get existing validation rule
    const rule = await conn.tooling
      .sobject("ValidationRule")
      .retrieve(ruleId);

    // Update metadata
    const result = await conn.tooling
      .sobject("ValidationRule")
      .update({
        Id: ruleId,
        Metadata: {
          ...rule.Metadata,
          active: active
        }
      });

    res.json({
      success: true,
      message: active
        ? "Rule Activated Successfully"
        : "Rule Deactivated Successfully",
      result
    });

  } catch (error) {
    console.error("Toggle error:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
