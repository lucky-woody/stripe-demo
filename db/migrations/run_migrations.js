const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

// This script reads one or more .sql files and runs them against a Postgres DB.

(async function runMigrations() {
  try {
    // 1. Create a new Pool using DATABASE_URL
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    // 2. Build the path to .sql file
    const filePath = path.join(__dirname, '001_initial_schema.sql');

    // 3. Read the .sql file as text
    const sql = fs.readFileSync(filePath, 'utf8');

    // 4. Execute the SQL against DB
    console.log(`\nRunning SQL from file: ${filePath}\n`);
    await pool.query(sql);
    console.log('Migration successful!\n');

    // 5. Close the pool
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
})();