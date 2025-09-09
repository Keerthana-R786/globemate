const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const databaseFile = process.env.DATABASE_URL || path.join(__dirname, '..', 'data', 'app.db');

const dataDir = path.dirname(databaseFile);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(databaseFile);

function initializeDatabase(callback) {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT,
      email TEXT,
      phone TEXT,
      nationality TEXT,
      passportNumber TEXT,
      emergencyContact TEXT,
      emergencyPhone TEXT,
      preferences TEXT,
      languages TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS translations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      language TEXT NOT NULL,
      createdAt TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      location TEXT,
      type TEXT,
      createdAt TEXT NOT NULL
    )`);

    db.get('SELECT id FROM users WHERE id = 1', (err, row) => {
      if (!row) {
        const seed = db.prepare(`INSERT INTO users (
          id, name, email, phone, nationality, passportNumber, emergencyContact, emergencyPhone, preferences, languages
        ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        seed.run(
          'John Doe',
          'john.doe@example.com',
          '+1 (555) 123-4567',
          'United States',
          'US123456789',
          'Jane Doe',
          '+1 (555) 987-6543',
          JSON.stringify({ notifications: true, darkMode: false, autoTranslate: true, offlineMaps: true }),
          JSON.stringify(['English', 'Spanish'])
        );
        seed.finalize(() => callback && callback());
      } else {
        callback && callback();
      }
    });
  });
}

module.exports = { db, initializeDatabase };


