/**
 * Module for providing REST api functionality
 */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const router = express.Router();

// use body parser middleware to parse request bodies
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// set cors header
router.use(cors({ origin: true, credentials: true }));

// import mongoose models
const Product = require('../models/product');
const Warehouse = require('../models/warehouse');

// GET all warhouses with complete product inventory
router.get('/warehouses', (req, res) => {
    // use mongoose populate to join product data with warehouses
    Warehouse.find({ }).populate('inventory.product').then(result => {
        res.json(result);   // send response as json
    });
});

// GET warehouse by name
router.get('/warehouses/:name', (req, res) => {
    const name = req.params.name.toUpperCase();

    Warehouse.find({ name: name }).populate('inventory.product').then(result => {
        // send data if found, 404 if not
        if(result[0]) {
            res.json(result[0]);
        } else {
            res.status(404).send({ message: "warehouse not found" });
        }
    });
});

// GET all products
router.get('/products', (req, res) => {
    Product.find({ }).then(result => {
        res.json(result);
    });
});

// GET product by product code
router.get('/products/:productCode', (req, res) => {
    const productCode = req.params.productCode;

    Product.find({ productCode: productCode }).then(result => {
        if(result[0]) {
            res.json(result[0]);
        } else {
            res.status(404).send({ message: "product not found" });
        }
    });
});

// POST add new product
router.post('/products/add', (req, res) => {
    let product = req.body;

    // set product code to next available number
    Product.find({ }, { productCode: 1, _id: 0 }).sort({ productCode: -1 }).limit(1).then(result => {
        
        product.productCode = Number(result[0].productCode + 1);

        const newProduct = new Product(product);

        newProduct.save((err, doc) => {
            if(err) {
                res.status(422).send({ message: err.message });
            } else {
                // add default stock for new product to all warehouses
                let entry = {
                    product: doc._id,
                    stock: 0
                }
                Warehouse.updateMany({ },    // all warehouses
                    { 
                        $push: { inventory: entry } 
                    }, err => {
                        if(err) console.log(err);
                    });
                res.status(201).send({ newProduct: doc });
            }
        });
    });
});

// PUT update stock for single product at specified warehouse
router.put('/warehouses/:name', (req, res) => {
    const name = req.params.name.toUpperCase();

    // use update one to change the stock value for specified product
    Warehouse.updateOne(
        { $and: [ { name: name }, { "inventory.product": { $eq: req.body.id } } ] }, 
        { $set: { "inventory.$.stock": req.body.stock } 
        }, (err, result) => {
            if(err) {
                res.status(400).send(err);
            } else if(result.n === 0) {
                // if not documents match, send a 404 response
                res.status(404).send({ message: "warehouse or product not found" });
            } else {
                // send 200 on success
                res.status(200).send();
            }
    });
});

// DELETE product by product code
router.delete('/products/:productCode', (req, res) => { 
    const productCode = req.params.productCode;

    Product.findOneAndDelete({ productCode: productCode }, (err, result) => {
        if(err) {
            res.status(400).send(err);
        } else if(result.n === 0) {
            res.status(404).send({ message: "product not found" });
        } else {
            // delete reference to product from warehouses
            Warehouse.updateMany({ },    // all warehouses
                { 
                    $pull: { inventory: { product: result._id } } 
                }, err => {
                    if(err) console.log(err);
                });
            res.status(200).send();
        }        
    });
});

// export router object for use with app.js
module.exports = router;
