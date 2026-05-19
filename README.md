# Smart Leads CRM Dashboard

A modern Full Stack CRM (Customer Relationship Management) Dashboard built using React, TypeScript, Node.js, Express.js, MongoDB Atlas, and JWT Authentication.

This project helps businesses manage leads efficiently with authentication, analytics, filtering, role-based access, and dashboard visualizations.

---

# Live Demo

## Frontend (Vercel)

https://smart-leads-crm-ebon.vercel.app

## Backend API (Render)

https://smart-leads-crm-backend.onrender.com

---

# Demo Credentials

## User Account

You can create your own account using the Register page.

OR

Use test credentials:

```txt id="k8ud9v"
Email: test123@gmail.com
Password: test123
```

---

# Features

## Authentication System

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Persistent Login using LocalStorage
* Role-Based Authorization

---

# Lead Management Features

## CRUD Operations

* Create Leads
* Read Leads
* Update Leads
* Delete Leads

---

# Advanced Features

## Search & Filtering

Search leads by:

* Name
* Email
* Company

## Filter Leads

* Filter by Status
* Filter by Source

## Sorting

* Latest Leads
* Oldest Leads

## Pagination

* Dynamic pagination system

## CSV Export

* Export all leads into CSV format

## Analytics Dashboard

* Total Leads
* Converted Leads
* Pending Leads
* Revenue Insights

---

# Tech Stack

## Frontend

* React
* TypeScript
* Tailwind CSS
* Axios
* React Router DOM
* React Hot Toast

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

---

# Folder Structure

```bash id="g5n44q"
smart-leads-crm/
│
├── client/          # Frontend
├── server/          # Backend
│
├── README.md
```

---

# Installation & Setup

## Clone Repository

```bash id="ff8x86"
git clone https://github.com/learningship1303/smart-leads-crm.git
```

---

# Frontend Setup

```bash id="r9i1lx"
cd client
npm install
npm run dev
```

Frontend runs on:

```txt id="ph6mya"
http://localhost:5173
```

---

# Backend Setup

```bash id="9g7nv2"
cd server
npm install
npm run dev
```

Backend runs on:

```txt id="qiv37h"
http://localhost:5000
```

---

# Environment Variables

Create `.env` file inside `server/`

```env id="m4gknp"
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# API Endpoints

## Authentication

```txt id="e61kdu"
POST /api/auth/register
POST /api/auth/login
```

## Leads

```txt id="1wd75f"
GET    /api/leads
POST   /api/leads
PUT    /api/leads/:id
DELETE /api/leads/:id
```

---

# Deployment

## Frontend Deployment

* Vercel

## Backend Deployment

* Render

## Database

* MongoDB Atlas

---

# Future Improvements

* Email Notifications
* Team Collaboration
* Dark Mode
* Charts & Graphs
* Lead Activity Timeline
* AI Lead Scoring

---

# Author

## Adhya Singh

GitHub:
https://github.com/learningship1303
