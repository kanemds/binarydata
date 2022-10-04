const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  image: String
})

module.exports = mongoose.model('file', fileSchema)