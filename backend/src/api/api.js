const express = require('express');
const morgan = require('morgan');

const countriesRoutes = require('./states/countries.routes');
const asignaRoutes = require('./subjects/asignatura.routes');
const alumRoutes = require('./users/alumno.routes');
const universitiesRoutes = require('./universities/universities.routes');

const app = express();

// recoge el json que le llega
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/v1', countriesRoutes);
app.use('/api/v1', asignaRoutes);
app.use('/api/v1', alumRoutes);
app.use('/api/v1/universidades', universitiesRoutes);

// Nuestros endpoints
app.get('/', (req, res, next) => {
    res.json({
        "message": "Hola vanesa"
    })
});

app.listen(5000, () => {
    console.log("Listening on http://localhost:5000");
});