const db = require('../connectiondb.js');
const express = require("express");
const tableNames = require('../../constants/tableNames');
const router = express.Router();

router.post('/insertar',(req, res)=>{
    const { nombre, ciudad } = req.body;
    console.log(nombre, ciudad);    
});

module.exports = router;