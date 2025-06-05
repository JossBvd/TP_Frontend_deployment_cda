require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 8100;

// Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Récupérer l'URL depuis .env
const API_URL = process.env.API_URL;

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.render('index', { podcasts: response.data });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des podcasts.');
    }
});

app.listen(PORT, () => {
    console.log(`Frontend en écoute sur http://localhost:${PORT}`);
});
