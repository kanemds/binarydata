const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const routes = require('./routes/routes')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('connected to Mongodb')
    app.listen(process.env.LOCAL_HOST, () => {
      console.log('connected to Server')
    })
  })
  .catch((error) => {
    console.log(error.message)
  })

app.use(cors())
app.use(fileUpload())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json())
app.use('/', routes)