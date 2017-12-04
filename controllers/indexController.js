const Product = require('../models/productModel');
const db = require('../database/mongoose');

exports.renderIndex = (req, res) => {
    var list;
    var cart;
    var subtotal = {
        installmentValue: 0,
        value: 0
    };

    Product.find().then((products) => {
        list = products;
    }).then(() => {
        Product.find({
            cart: true
        }).then((products) => {

            products.forEach((prod)=>{
                subtotal.installmentValue += prod.price.installmentValue
                subtotal.value += prod.price.value
            })

            cart = products;

            res.render('index', {
                list: list,
                cart: cart,
                subtotal:subtotal
            });
        })
    });
}