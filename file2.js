// constants and requirements:
const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');
const path = require('path');

// sending the json file to the server
app.get('/books', (req, res) => {
    const dataPath = path.join(__dirname, 'data', 'data.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        res.send(data);
    });
});

// log
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
