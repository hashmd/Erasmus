const db = require('../connectiondb.js');
const tablesName = require('../../constants/tableNames');

const express = require("express");
const tableNames = require('../../constants/tableNames');

const router = express.Router();

router.get('/countries/:pais', async(req, res) => {
    const pais = await db.select().table(tableNames.pais).where('code', req.params.pais);
    res.json(pais);
})


router.get('/countries', async(req, res, next) => {
    //mandamos los paises que están en nuestra BD
    const countries = await db.select().table(tablesName.pais);
    console.log("Entra en /countries");
    res.json(countries);
});


module.exports = router; //exportamos para usarlo en nuestro api.js