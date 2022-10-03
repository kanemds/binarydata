const router = require('express').Router()
const upload = require('./path/upload')

router.use('/upload', upload)

module.exports = router