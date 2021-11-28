const { Product, validate } = require('../models/product');
const multer = require('multer')
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => { 
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send(error);
    
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            size: req.body.size,
            category: req.body.category,
            price: req.body.price,
            img: req.body.img,
        });
        await product.save();

        return res.send(product);
    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    } 
});

router.delete('/:id', async (req, res) => {
    try {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product)
  return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);
      return res.send(product);
  } catch (ex) {
  return res.status(500).send(`Internal Server Error: ${ex}`);
  }

});

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        return res.send(products);
    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);    
    }
});

router.get('/:id', async (req, res) => {
    try {
  const product = await Product.findById(req.params.id);
  if (!product)
  return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);
      return res.send(product);
  } catch (ex) {
  return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});




module.exports = router;