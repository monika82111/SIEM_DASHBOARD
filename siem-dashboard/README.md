# SIEM Dashboard

A Security Information and Event Management (SIEM) dashboard for visualizing and analyzing log data. This project includes a Node.js/Express backend with MongoDB and a React frontend (see `/siem-dashboard`).

---

## Table of Contents

- [Setup & Run Instructions](#setup--run-instructions)
- [API Descriptions](#api-descriptions)
- [Design Decisions & Assumptions](#design-decisions--assumptions)

---

## Setup & Run Instructions

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- MongoDB (local or cloud instance)

### 1. Backend Setup

1. Navigate to the `Backend` directory:
    ```sh
    cd Backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file (optional) to override defaults:
    ```
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/siem_dashboard
    ```

4. Start the backend server:
    ```sh
    npm start
    ```
    The server will  onrun `http://localhost:5000` by default.

### 2. Frontend Setup

1. Navigate to the [siem-dashboard](http://_vscodecontentref_/0) directory:
    ```sh
    cd siem-dashboard
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file (optional) to override API URL:
    ```
    REACT_APP_API_URL=http://localhost:5000/api
    ```

4. Start the frontend:
    ```sh
    npm start
    ```
    The app will open at `http://localhost:3000`.

---

## API Descriptions

All endpoints are prefixed with `/api`.

### `GET /api/logs`

- **Description:** Returns paginated logs, optionally filtered by [event_type](http://_vscodecontentref_/1) and/or [username](http://_vscodecontentref_/2).
- **Query Parameters:**
  - [page](http://_vscodecontentref_/3) (number, default: 1)
  - [limit](http://_vscodecontentref_/4) (number, default: 20)
  - [event_type](http://_vscodecontentref_/5) (string, optional)
  - [username](http://_vscodecontentref_/6) (string, optional, partial match)
- **Response:**
  ```json
  {
    "logs": [ ... ],
    "totalPages": 5,
    "currentPage": 1,
    "totalLogs": 100
  }