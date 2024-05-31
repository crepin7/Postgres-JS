const express = require('express');
const { Client } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'bibliotheque',
    password: 'crepin007',
    port: '5432'
});

client.connect();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/livres', (req, res) => {
    client.query('SELECT * FROM livre', (err, result) => {
        if(err){
            console.error(err);
            res.status(500).send('Erreur du serveur');
            return;
        }
        res.json(result.rows);
    });
});

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});

