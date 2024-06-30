const express = require("express");
const db = require("./db");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/databases", async (req, res) => {
  try {
    const databases = await db.getDatabases();
    res.json(databases);
  } catch (err) {
    res.status(500).send("Error retrieving databases");
  }
});

app.get("/database/:database", async (req, res) => {
  const { database } = req.params;
  console.log('--database', database);
  try {
    const tables = await db.getTables(database);
    console.log('--tables', tables);
    res.json(tables);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error retrieving tables from database ${database}`);
  }
});

// http://localhost:3000/database?database=env_store&table=EnvVariables&pageNumber=2&pageSize=1
app.get("/database", async (req, res) => {
    const { database, table, pageNumber, pageSize } = req.query;
    console.log('--req.query', req.query);

    try {
      const tables = await db.getTablesData({database, table, pageNumber, pageSize});
      res.json(tables);
    } catch (err) {
      console.error(err);
      res.status(500).send(`Error retrieving tables from database ${database}`);
    }
  });

// Start the server
const server = app.listen(port, async () => {
  try {
    await db.connect();
    console.log(`Server running at http://localhost:${port}/`);
  } catch (err) {
    console.error(
      "Failed to start the server due to database connection error"
    );
    await db.closeClient();
    process.exit(1);
  }
});

// Handle process termination signals
process.on("SIGINT", async () => {
  console.log("Received SIGINT. Shutting down gracefully...");
  server.close(async () => {
    await db.closeClient();
    process.exit(0);
  });
});

process.on("SIGTERM", async () => {
  console.log("Received SIGTERM. Shutting down gracefully...");
  server.close(async () => {
    await db.closeClient();
    process.exit(0);
  });
});

process.on("uncaughtException", async (err) => {
  console.error("Uncaught exception", err);
  await db.closeClient();
  process.exit(1);
});
