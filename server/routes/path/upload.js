const router = require('express').Router()
const { postRequest } = require('../../controllers/uploadController')

router.post('/', postRequest)

module.exports = router