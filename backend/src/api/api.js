const express = require('express');

const countriesRoutes = require('./states/countries.routes');

const app = express();

// recoge el json que le llega
app.use(express.json());

app.use('/api/v1', countriesRoutes);

// Nuestros endpoints
app.get('/', (req, res, next) => {
    res.json({
        "message": "Hola vanessa"
    })
});

app.listen(5000, () => {
    console.log("Listening on http://localhost:5000");
});