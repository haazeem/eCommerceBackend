var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    productDescription: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true
    },
    productQuantity: {
        type: Number,
        required: true
    },
    idSeller: {
        type: String,
        required: true
    },
    ProductImg: {
        type: String,
        default :  null
    }

});

module.exports = mongoose.model('product', blogSchema);
