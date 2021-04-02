const db = require('../connectiondb.js');
const express = require("express");
const tableNames = require('../../constants/tableNames');
const router = express.Router();

router.get('/asignatura/:id_asig&:id_facult', async(req, res) => {
    const materia= await db.select().table(tableNames.asignatura_esp).where('code', req.params.id_asig);
    const facul = await db.select().table(tableNames.facultad).where('code', req.params.id_facul);
    const asig = await db.select().table(tableNames.asignatura_esp).where('code', req.params.id_asig);
    res.json(asig);
});

module.exports = router; //exportamos para usarlo en nuestro api.js