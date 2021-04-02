const db = require('../connectiondb');
const express = requiere('express');
const bcrypt = requiere('bcrypt');
const jwt = require('jsonwebtoken');
const tableNames = require('../../constants/tableNames');
const { insert } = require('../connectiondb');

const router = express.Router();


router.post('/register', async(req, res, next) => {
    const usuario = db.select().table(tableNames.user).where(email,req.body.email);
    if (usuario){
        res.json({
            error: "Usuario ya existe"
        }) ;
        next();  
    }
    //user no existe
    const hashPassword = await bcrypt.hash(req.body.password.trim(),12);
    const newUser = {
        email: req.body.email,
        password: hashPassword,
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido1: req.body.apellido1,
    }
    const insertUser = await db.insert(newUser).into(tableNames.user);
    if(insertUser.countRows>0){
        res.json({
            msg: "Usuario registrado"
        }) ;
    }

})