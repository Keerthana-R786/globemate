const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { db, initializeDatabase } = require('./sqlite');

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'globemate-api', version: '1.0.0' });
});

app.get('/api/profile', (req, res) => {
  db.get('SELECT * FROM users WHERE id = 1', (err, row) => {
    if (err) return res.status(500).json({ error: 'db_error' });
    res.json(row || {});
  });
});

app.put('/api/profile', (req, res) => {
  const {
    name,
    email,
    phone,
    nationality,
    passportNumber,
    emergencyContact,
    emergencyPhone,
    preferences = {},
    languages = [],
  } = req.body || {};

  const preferencesJson = JSON.stringify(preferences);
  const languagesJson = JSON.stringify(languages);

  const sql = `UPDATE users SET name = ?, email = ?, phone = ?, nationality = ?, passportNumber = ?, emergencyContact = ?, emergencyPhone = ?, preferences = ?, languages = ? WHERE id = 1`;
  const params = [
    name || null,
    email || null,
    phone || null,
    nationality || null,
    passportNumber || null,
    emergencyContact || null,
    emergencyPhone || null,
    preferencesJson,
    languagesJson,
  ];

  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: 'db_error' });
    db.get('SELECT * FROM users WHERE id = 1', (err2, row) => {
      if (err2) return res.status(500).json({ error: 'db_error' });
      res.json(row || {});
    });
  });
});

app.get('/api/translations', (req, res) => {
  db.all('SELECT * FROM translations ORDER BY createdAt DESC LIMIT 20', (err, rows) => {
    if (err) return res.status(500).json({ error: 'db_error' });
    res.json(rows || []);
  });
});

app.post('/api/translations', (req, res) => {
  const { text, language } = req.body || {};
  if (!text || !language) return res.status(400).json({ error: 'missing_fields' });
  const sql = `INSERT INTO translations (text, language, createdAt) VALUES (?, ?, datetime('now'))`;
  db.run(sql, [text, language], function (err) {
    if (err) return res.status(500).json({ error: 'db_error' });
    db.get('SELECT * FROM translations WHERE id = ?', [this.lastID], (err2, row) => {
      if (err2) return res.status(500).json({ error: 'db_error' });
      res.status(201).json(row);
    });
  });
});

app.get('/api/places', (req, res) => {
  db.all('SELECT * FROM places ORDER BY createdAt DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: 'db_error' });
    res.json(rows || []);
  });
});

app.post('/api/places', (req, res) => {
  const { name, location, type } = req.body || {};
  if (!name) return res.status(400).json({ error: 'missing_name' });
  const sql = `INSERT INTO places (name, location, type, createdAt) VALUES (?, ?, ?, datetime('now'))`;
  db.run(sql, [name, location || null, type || null], function (err) {
    if (err) return res.status(500).json({ error: 'db_error' });
    db.get('SELECT * FROM places WHERE id = ?', [this.lastID], (err2, row) => {
      if (err2) return res.status(500).json({ error: 'db_error' });
      res.status(201).json(row);
    });
  });
});

app.delete('/api/places/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM places WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: 'db_error' });
    res.json({ deleted: this.changes > 0 });
  });
});

initializeDatabase(() => {
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
});


