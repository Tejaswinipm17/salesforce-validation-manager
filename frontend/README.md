# Salesforce Validation Manager

A web application that connects to Salesforce using OAuth 2.0 and allows administrators to view and manage Validation Rules directly from a Salesforce Developer Org.

## Features

- Salesforce OAuth 2.0 Login
- Fetch Validation Rules using Salesforce Tooling API
- Display Validation Rules and their status (Active/Inactive)
- Activate or Deactivate Validation Rules
- Real-time synchronization with Salesforce
- React Frontend
- Node.js/Express Backend
- Deployed on Render

## Tech Stack

### Frontend
- React
- Vite
- Axios
- CSS

### Backend
- Node.js
- Express.js
- Axios

### Salesforce
- Salesforce Developer Org
- Connected App
- OAuth 2.0
- Tooling API

---

## Project Structure

```text
salesforce-validation-manager/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/Tejaswinipm17/salesforce-validation-manager.git
cd salesforce-validation-manager
```

### 2. Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on:

```text
http://localhost:5000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Salesforce Configuration

### Developer Org

Create a Salesforce Developer Org:

https://developer.salesforce.com/signup

### Connected App

Configure:

- Enable OAuth Settings
- Callback URL
- Consumer Key
- Consumer Secret

### OAuth Scopes

Include:

- Access and manage your data (api)
- Perform requests on your behalf at any time (refresh_token, offline_access)

---

## Validation Rules Created

Account Object Validation Rules:

1. Account_Name_Required
2. Phone_Required
3. Billing_Country_Required
4. Revenue_Positive
5. Website_HTTPS

---

## API Endpoints

### Login to Salesforce

```http
GET /api/salesforce/login
```

### Get Validation Rules

```http
GET /api/salesforce/validation-rules
```

### Toggle Validation Rule

```http
PATCH /api/salesforce/toggle-rule/:id
```

---

## Deployment

### GitHub Repository

https://github.com/Tejaswinipm17/salesforce-validation-manager

### Live Application

https://salesforce-validation-manager-djva.onrender.com

---

## Assignment Requirements Covered

- Salesforce Developer Org
- Validation Rules on Account Object
- Connected App
- OAuth 2.0 Authentication
- Fetch Validation Rules using Tooling API
- Display Active/Inactive Status
- Enable/Disable Validation Rules
- React Frontend
- Online Deployment

---

## Author

**Tejaswini PM**

Associate Software Engineer Assignment Submission