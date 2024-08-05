const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Ensure this path matches your db.js file

const app = express();
const port = 3000; // Choose any port number you prefer

app.use(bodyParser.json());

// Test endpoint
app.get('/', (req, res) => {
    res.send('Hello, API is working!');
});

// Endpoint to get all notes
app.get('/notes', (req, res) => {
    db.all('SELECT * FROM notes', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Endpoint to create a new note
app.post('/notes', (req, res) => {
    const { title, content } = req.body;
    db.run('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

// Endpoint to delete a note by ID
app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM notes WHERE id = ?', id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ changes: this.changes });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
