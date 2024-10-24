# Rule Engine

This is a rule engine which uses Abstract Syntax Tree (AST) to represent conditional rules and allow for dynamic creation,combination, and modification of these rules. The system consists of a **Backend** powered by **Node.js** and **Express.js**, and a **Frontend** built using **React**.

## High Level Design Diagram

![High Level Diagram](https://github.com/sid-rh/RuleEngine/blob/main/RuleEngine.drawio.png)

## Backend Setup

To get started with the backend, follow the steps below:

### 1. Install Dependencies

In the `/Backend` directory, run the following command to install all required libraries:

```bash
npm install
```

### 2. Environment Variables

Set up the following environment variables in your `.env` file:


#### MongoDB Configuration

- `MONGO_URL`: Your MongoDB connection string.

#### Port Configuration

- `PORT`: Port number on which the backend server will run.

---

### 3. Run the Backend Server

Use the following command to start the backend server:

```bash
nodemon app
```

### 4. API Endpoints

The following API endpoints are available for retrieving weather data:

- **POST** `/rules`: Create a new rule.
- **GET** `/rules`: Get all the created rules.
- **POST** `/combine`: Combine rules.
- **POST** `/evaluate`: Evaluate expressions against a rule.
- **DELETE** `/rules/:id`: Delete a rule.

## Frontend Setup

### 1. Install Dependencies

In the `/rule-engine-ui` directory, run the following command to install all required libraries:

```bash
npm install
```

### 2. Environment Variables

Add the following environment variable in your `.env` file:
- `REACT_APP_BASE_URL`: Set this to the base URL of your backend server, e.g.,`http://localhost:<Backend port number>/api`.

### 3. Initialize Tailwind

Run the following command to initialize tailwind:
```bash
npx tailwindcss init -p
```


### 3. Run the Frontend

Use the following command to start the frontend application:

```bash
npm start
```


