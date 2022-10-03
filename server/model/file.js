const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  img: String
})

module.exports = mongoose.model('file', fileSchema)