const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const Product = require('../models/product');
const Shoppingcart = require('../models/shoppingCart')
var app = express();


app.use(bodyParser.json());
app.use(cors());


app.post("/addtoShoppingCart", (req, res) => {
    let _id = req.headers['id'];
    let productsData = []
    let newProducts;
    //console.log(_id);
    if (_id !== "undefined") {
        Shoppingcart.findOne({ _id }).then((result) => {
            let _idfromFront = req.body._id
            productsData.push(result.products['0'].product);
             //console.log(productsData);
            data = new Product({
                productName: req.body.productName,
                productDescription: req.body.productDescription,
                productPrice: req.body.productPrice,
                productQuantity: req.body.productQuantity,
                ProductImg: req.body.ProductImg
            })
            let oldquantity = result.products['0'].quantity;
            let _verifID = result.products['0'].product['0']._id;
            console.log(_idfromFront);
            console.log(_verifID);
            if (_idfromFront === _verifID) {
                let products = [{ product: data, quantity: oldquantity + 1 }]
                Shoppingcart.findOneAndUpdate({ _id }, { $set: { products } }).then((resultt) => {
                    console.log("ok")
                })
            } else {
                productsData.push(data);
                let products = [{ product: data, quantity: oldquantity + 1 }]
                Shoppingcart.findOneAndUpdate({ _id }, { $set: { products } }).then((resultt) => {
                    console.log("ok")
                })
            }


            console.log(products);

            //Product.findOneAndUpdate({ _id }, { $set: { products } })

        }).catch((error) => {

        })
    } else {
        data = new Product({
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            productPrice: req.body.productPrice,
            productQuantity: req.body.productQuantity,
            ProductImg: req.body.ProductImg
        })
        productsData.push(data);
        let shopCart = new Shoppingcart({
            products: [{
                product: { productsData },
                quantity: req.body.productQuantity
            }]
        })
        shopCart.save().then((resul) => {
            res.send(resul._id);
        }).catch((errorr) => {
            console.log(errorr)
        })
    }

})


app.post("/productListe", (req, res) => {
    Product.find({}).then((result) => {
        console.log(result)
        res.status(200).send(result);
    }, (err) => {
        res.send("Nope ! Wrong")
    })
})


module.exports = app;