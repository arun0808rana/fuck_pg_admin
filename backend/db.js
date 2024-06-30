const { Client } = require("pg");
const { pool } = require('pg');

let client;

async function connect(database = "") {
  try {
    const connectionString = `postgresql://postgres:root@localhost:5432/${database}`;
    console.log("--connection string", connectionString);

    client = new Client({
      connectionString: connectionString,
    });

    await client.connect();
    console.log("PostgreSQL client connected.");
  } catch (err) {
    console.error("Error connecting to PostgreSQL", err);
    throw err;
  }
}

async function getDatabases() {
  try {
    const res = await client.query(
      "SELECT datname FROM pg_database WHERE datistemplate = false;"
    );
    return res.rows.map((row) => row.datname);
  } catch (err) {
    console.error("Error retrieving databases", err);
    throw err;
  }
}

async function closeClient() {
  try {
    await client.end();
    console.log("PostgreSQL client disconnected.");
  } catch (err) {
    console.error("Error disconnecting PostgreSQL client", err);
    throw err;
  }
}
async function getTables(database) {
  try {
    await closeClient();
    await connect("env_store");
    const query = `
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_catalog = $1
      AND table_type = 'BASE TABLE';
  `;
    const params = [database];

    const res = await client.query(query, params);

    console.log("--res", res.rows);

    return res.rows.map((row) => row.table_name);
  } catch (err) {
    console.error("Error retrieving tables", err);
  }
}

async function getTables(database) {
  try {
    await closeClient();
    await connect(database);
    const query = `
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_catalog = $1
      AND table_type = 'BASE TABLE';
  `;
    const params = [database];

    const res = await client.query(query, params);

    console.log("--res", res.rows);

    return res.rows.map((row) => row.table_name);
  } catch (err) {
    console.error("Error retrieving tables", err);
  }
}

async function getTablesData({ database, table, pageNumber, pageSize }) {
  try {
    await closeClient();
    await connect(database);

    const query = `
    SELECT * FROM "${table}"
    LIMIT $1 OFFSET $2
  `;
    const { offset, limit } = getOffsetAndLimit({pageNumber, pageSize});
    const params = [limit, offset];
    const res = await client.query(query, params);

    return res.rows;
  } catch (error) {}
}

function getOffsetAndLimit({pageNumber, pageSize}) {
  try {
    const page = parseInt(pageNumber) || 1;
    const limit = parseInt(pageSize) || 10;
    const offset = (page - 1) * limit;
    return { offset, limit };
  } catch (error) {
    console.error("Error in getOffsetAndLimit fn", error.message);
  }
}

module.exports = {
  connect,
  getDatabases,
  closeClient,
  getTables,
  getTablesData
};
