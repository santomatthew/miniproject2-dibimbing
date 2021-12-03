const express = require('express')
const app = express()
const port = 3000


const productController = require('./controller/productController')
const accountController = require('./controller/accountController')

app.use(express.json())

app.use('/',productController)
app.use('/',accountController)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })  