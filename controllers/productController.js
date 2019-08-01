const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const fileupload=require('express-fileupload');
const Product = require('../models/product');

var app = express();


app.use(bodyParser.json());
app.use(cors());


app.post("/productAdd", (req, res) => {
    data = new Product({
        productName: req.body._productName,
        productDescription: req.body._productDescription,
        productPrice: req.body._productPrice,
        productQuantity: req.body._productQuantity,
        idSeller: req.body._idSeller,
    })
    data.save().then((result) => {
        res.send("<p>OKay Done</p>")
    }, (err) => {
        res.send("Nope ! Wrong")
    })
});


app.post("/productListe", (req, res) => {
    Product.find({}).then((result) => {
        console.log(result)
        res.status(200).send(result);
    }, (err) => {
        res.send("Nope ! Wrong")
    })
})


module.exports = app;