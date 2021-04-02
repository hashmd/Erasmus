const db = require('../connectiondb.js');
const express = require('express');
const tableNames = require('../../constants/tableNames');

const router = express.Router();


router.get('/matricula/:id_alum', async(req, res, next) => {
    //mandamos las asiganturas que están en nuestra BD
    const asig = await db.select().table(tableNames.matricula).where('dni', req.params.id_alum);
    console.log("Estás matriculado en las asignaturas:");
    res.json(asig);
});


module.exports = router; //exportamos para usarlo en nuestro api.js