const express = require('express')
const routes = express.Router()
const eCommAcc = require('../service/account')

// api account
routes.post('/createAccount',eCommAcc.createAccount)
routes.delete('/deleteAccount/:id',eCommAcc.deleteAccount)
routes.post('/loginAccount',eCommAcc.loginAccount)

module.exports = routes