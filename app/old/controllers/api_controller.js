var express = require('express');
var router = express.Router();

// ROUTING 

router.get('/', function(req,res){
    burger.all(function(data){
        res.json(data);
    })
})


router.delete('/:id', function(req,res){
    burger.destroy(req.params.id,function(data){
        res.json(data)
    })
})

module.exports = router;