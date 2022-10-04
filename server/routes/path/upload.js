const router = require('express').Router()
const { postRequest, getRequest } = require('../../controllers/uploadController')

router.get('/', getRequest)
router.post('/', postRequest)

module.exports = router