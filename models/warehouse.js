/**
 * Mongoose schema for warehouse documents
 */

const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    address: String,
    zipCode: String,
    city: String,
    country: String,
    area: Number,
    employees: Number,
    inventory: [
        {
            _id: false,
            product: { type: mongoose.Types.ObjectId, ref: "products" },
            stock: Number
        }
    ]
}, {
    versionKey: false
});

const Warehouse = mongoose.model('warehouses', warehouseSchema);
module.exports = Warehouse;
