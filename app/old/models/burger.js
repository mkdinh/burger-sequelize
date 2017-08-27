var orm = require('../config/orm.js');

burger = {

    all: function(fn){
        orm.all('burgers',function(res){
            fn(res)
        })
    },

    find: function(id,fn){
        orm.find('burgers',id,function(res){
            fn(res)
        })
    },

    create: function(name,fn){
        var randNum = Math.floor(Math.random() *30) + 1;
        var picURL = '/img/avatar/avBurger'+randNum+'.png';

        orm.insertOne('burgers',name,picURL,function(res){
            fn(res)
        })
    },

    update: function(col,val,id,fn){
        orm.updateOne('burgers',col,val,id,function(res){
            fn(res)
        })
    },

    updateTwo: function(col1,val1,col2,val2,id,fn){
        orm.updateTwo('burgers',col1,val1,col2,val2,id,function(res){
            fn(res)
        })
    },

    delete: function(id,fn){
        orm.deleteOne('burgers',id,function(res){
            fn(res)
        })
    }
}

module.exports = burger;

