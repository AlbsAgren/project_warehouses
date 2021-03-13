/**
 * Mongoose schema for product documents
 */

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productCode: {
        type: Number,
        unique: true,
        required: true
    },
    name: String,
    description: String,
    price: String,
    color: String,
    material: String,
    department: String,
    manufacturer: String
}, {
    versionKey: false
});

const Product = mongoose.model('products', productSchema);
module.exports = Product;
