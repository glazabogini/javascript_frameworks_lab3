// constants:
const express = require('express');
const app = express();
const port = 3000;

// descriptions for the group
app.get('/', (req, res) => {
    res.send(`
        <h1>Group 10</h1>
        <ul>
            <li>Rodolfo de Carvalho Silva</li>
            <li>Mikhail Nikishin</li>
            <li>Rafael Reichert Maubrigades</li>
        </ul>
    `);
});

// log
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});