var express = require('express')
var router = express.Router()

router.get('/',function(req,res){
    res.send('wiki home page')
})

router.get('/about', function(req,res){
    res.send('wiki about page')
})

module.exports = router