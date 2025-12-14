const fs = require('fs');
const pool = require('./config/database');

async function setupDb() {
  try {
    const sql = fs.readFileSync('./user_schema.sql', 'utf-8');
    const statements = sql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt !== '' && !stmt.startsWith('--'));

    for (const statement of statements) {
      console.log('Executing:', statement.substring(0, 50) + '...');
      await pool.execute(statement);
    }

    console.log('✅ Database tables created successfully');

    // Test by checking if table exists
    const [rows] = await pool.execute("SHOW TABLES LIKE 'User'");
    if (rows.length > 0) {
      console.log('✅ User table confirmed');
    }

  } catch (error) {
    console.error('❌ Setup error:', error);
  } finally {
    process.exit();
  }
}

setupDb();
