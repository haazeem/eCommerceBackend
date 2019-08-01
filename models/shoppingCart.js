var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var blogSchema = new Schema({
    addedDate: {
        type: Date,
        default: new Date()
    },
    products: [{
        product: {
            type: Array,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }]


});

module.exports = mongoose.model('Shoppingcart', blogSchema);
