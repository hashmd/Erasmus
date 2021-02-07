const Knex = require("knex");
const tablesName = require('../../constants/tableNames');

const express = require("express");
const tableNames = require('../../constants/tableNames');

const router = express.Router();

router.get('/countries', async(req, res, next) => {
    //mandamos los paises que están en nuestra BD
    const countries = await Knex.select().table(tableName.pais);
    res.json(countries);
});

/*
router.get('/countries/:pais',(req, res, next)=>{
    const pais = req.param.pais;
    //select * from countries where name = {pais}
});
*/

module.exports = router; //exportamos para usarlo en nuestro api.js