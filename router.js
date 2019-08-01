const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


var config = require("./db/config")



var app = express();
var port = "8090";
const product = require("./controllers/productController")
const shoppingCart=require("./controllers/shoppingCartController");
const seller=require('./controllers/sellerController');


app.use(bodyParser.json());
app.use(cors());
app.use("/product", product);
app.use("/shoppingcart", shoppingCart);
app.use("/seller", seller);



app.get("/", (req, res) => {
    res.send({
        message: "<h1>Welcome to the Server </h1>"
    });
});

app.listen(port, () => {
    console.log("server started on port 8090");
});

