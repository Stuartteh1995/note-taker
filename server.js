const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// API routes
app.get('/api/notes', (req, res) => {
  // Read db.json and return all saved notes as JSON
});

app.post('/api/notes', (req, res) => {
  // Receive a new note, add it to db.json, and return the new note
});

// HTML routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      res.json(notes);
    });
  });
  
  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
  
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      notes.push(newNote);
  
      fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) throw err;
        res.json(newNote);
      });
    });
  });
  