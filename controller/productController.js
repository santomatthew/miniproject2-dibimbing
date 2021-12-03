const express = require('express')
const routes = express.Router()
const eCommProduct = require('../service/product')

// api product
routes.get('/showProduct/:id',eCommProduct.getProduct)
routes.post('/createProduct',eCommProduct.createProduct)
routes.delete('/deleteProduct/:id',eCommProduct.deleteProduct)
routes.put('/updateProduct/:id',eCommProduct.updateProduct)

module.exports = routes