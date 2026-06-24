# Salesforce Validation Manager 

## Overview

Salesforce Validation Manager is a full-stack web application that integrates with Salesforce using OAuth 2.0 and the Salesforce Tooling API. It allows users to authenticate with Salesforce, retrieve validation rules from the Account object, view their current status, and activate or deactivate validation rules directly from the web application.

## Features

- Salesforce OAuth 2.0 Login
- Connected App Integration
- Retrieve Validation Rules using Salesforce Tooling API
- Display Validation Rules with Active/Inactive Status
- Activate or Deactivate Validation Rules
- Real-time Updates in Salesforce Org
- Node.js + Express Backend
- React Frontend
- Cloud Deployment using Render

## Technologies Used

### Frontend
- React.js
- Axios
- HTML
- CSS

### Backend
- Node.js
- Express.js

### Salesforce
- Salesforce Developer Org
- Connected App
- OAuth 2.0
- Tooling API
- Validation Rule Metadata

### Deployment
- Render

## Project Architecture

     text
React Frontend
       │
       ▼
Node.js / Express Backend
       │
       ▼
Salesforce OAuth 2.0
       │
       ▼
Salesforce Tooling API

## Setup Instructions

### Clone Repository

   bash
git clone https://github.com/Tejaswinipm17/salesforce-validation-manager.git
cd salesforce-validation-manager

### Backend Setup

   bash
cd backend
npm install

Create a `.env` file:

env
PORT=5000

SF_CLIENT_ID=YOUR_CLIENT_ID
SF_CLIENT_SECRET=YOUR_CLIENT_SECRET

SF_CALLBACK_URL=http://localhost:5000/api/salesforce/callback

SF_LOGIN_URL=https://login.salesforce.com

Start Backend:

bash
npm start

### Frontend Setup

  bash
cd frontend
npm install
npm start

## API Endpoints

### Login to Salesforce

  http
GET /api/salesforce/login

### OAuth Callback

   http
GET /api/salesforce/callback

### Get Validation Rules

http
GET /api/salesforce/validation-rules

### Get Rule Details

http
GET /api/salesforce/rule-details/:name

### Toggle Validation Rule
http
PATCH /api/salesforce/toggle-rule/:id

Request Body:

  json
{
  "active": false
}

## Sample Validation Rules

Created on the Salesforce Account Object:

- Account_Name_Required
- Phone_Required
- Billing_Country_Required
- Revenue_Positive
- Website_HTTPS


## Deployment

Live Application:

https://salesforce-validation-manager-djva.onrender.com

GitHub Repository:

https://github.com/Tejaswinipm17/salesforce-validation-manager


## Assignment Requirements Covered

- Salesforce Developer Org Creation
- Connected App Configuration
- OAuth 2.0 Authentication
- Validation Rule Retrieval using Tooling API
- Display Validation Rule Status
- Activate / Deactivate Validation Rules
- Deploy Application Online
- Source Code Hosted on GitHub

## Author

**Tejaswini PM**

Associate Software Engineer Assignment Submission
