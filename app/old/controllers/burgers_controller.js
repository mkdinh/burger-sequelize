var express = require('express');
var router = express.Router();

// ROUTING 

router.get('/', function(req,res){
    Burger.findAll(function(data){
        res.render('index', {burgers: data})
    })
})

router.get('/show/:id', function(req,res){
    burger.find(req.params.id,function(data){
        res.render('show', data[0])
    })
})

router.get('/edit/:id', (req,res) => {
    burger.find(req.params.id,function(data){
        res.render('edit', data[0])
    })
})


router.post('/', function(req,res){
    burger.create(req.body.burger_name, function(data){
        res.redirect('/')
    })
})


router.put('/:id', function(req,res){
    burger.update('devoured',req.body.choice,req.params.id,function(data){
        res.redirect('/')
    })
})

router.put('/edit/:id', function(req,res){
    var col =['burger_name', 'devoured'];
    var val = [req.body.burger_name,req.body.devoured];
    var id = req.params.id;
    
    burger.updateTwo(col[0],val[0],col[1],val[1],id, (data) => {
        console.log(data)
        res.redirect('/show/'+req.params.id)
    });
})

router.delete('/:id', function(req,res){
    burger.delete(req.params.id, function(data){
        console.log('hey')
        res.redirect('/')
    })
})



module.exports = router;

