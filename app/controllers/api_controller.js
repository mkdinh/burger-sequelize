
// Importing Dependencies
// -------------------------------------------------
var express = require('express');
var router = express.Router();
var models = require('../models');
var Burger = models.Burger;


// API routers

router.get('/all', (req,res) => {
    Burger.findAll().then((data) => {
        res.json(data)
    })
})

router.get('/:id', (req,res) => {
    Burger.findById(req.params.id).then((data) => {
        res.json(data)
    })
})

router.post('/new', (req,res) => {
    Burger.create(req.body)
    .then((data) => {
        res.json(data);
    })
})

router.put('/:id',(req,res) => {
    console.log(req.body)
    Burger.update(req.body,{where: {id: req.params.id}})
    .then((data) => {
        res.json(data)
    })
})

router.delete('/:id', (req,res) => {
    Burger.destroy({where: {id: req.params.id}})
    .then((data) => {
        res.json(data)
    })
})


// Exporting Router to server.js
// -------------------------------------------------
module.exports = router;