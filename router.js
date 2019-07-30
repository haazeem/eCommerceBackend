const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');




var app = express();
var port = "8088";

app.use(bodyParser.json());
app.use(cors());




app.get("/", (req, res) => {
    res.send({
        message: "<h1>Welcome to the Server </h1>"
    });
});

app.listen(port, () => {
    console.log("server started on port 8090");
});

