const db = require('./db');

db.serialize(() => {
    db.each('SELECT id, title, content FROM notes', (err, row) => {
        if (err) {
            console.error('Error reading data:', err.message);
        } else {
            console.log(`ID: ${row.id}, Title: ${row.title}, Content: ${row.content}`);
        }
    });
});

db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('Database connection closed.');
    }
});
