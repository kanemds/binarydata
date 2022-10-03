const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const routes = require('./routes/routes')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParseL: true,
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
app.use('/', routes)