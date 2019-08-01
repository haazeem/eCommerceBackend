const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var ms = require('mediaserver');

const fileupload = require('express-fileupload');
const Product = require('../models/product');
const fs = require("fs");
var app = express();


app.use(bodyParser.json());
app.use(cors());
app.use(fileupload());

app.post("/productAdd", (req, res) => {
    data = new Product({
        productName: req.body._productName,
        productDescription: req.body._productDescription,
        productPrice: req.body._productPrice,
        productQuantity: req.body._productQuantity,
        idSeller: "qsdq6464684qs6d46qs",
    })
    data.save().then((result) => {
        res.send(result._id);
    }, (err) => {
        res.send("Nope ! Wrong")
    })

    //fs.writeFileSync("uploadImgs/" + req.files['productImg'].name);
});


app.post("/uploadimg", (req, res) => {
    let _id = req.headers['id']
    Product.findOne({ _id }).then((result) => {
        let ext = ((req.files['productImg'].name + "").split("."))[1];
        let ProductImg = "uploadImgs/" + result.productName + "." + ext;
        fs.writeFileSync(ProductImg, req.files['productImg'].data);
        Product.findOneAndUpdate({ _id }, { $set: { ProductImg } }).then((resu) => {
            console.log("ok")
        }, (erro) => {

        })
    })

})

app.get("/streamImg", (req, res) => {
    let file = req.query .file
    ms.pipe(req, res, file);
})


module.exports = app;