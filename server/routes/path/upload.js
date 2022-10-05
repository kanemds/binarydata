const router = require('express').Router()
const { postRequest, getRequest, deleteRequest, putRequest } = require('../../controllers/uploadController')

router.get('/', getRequest)
router.post('/', postRequest)
router.delete('/:id', deleteRequest)
router.put('/:id', putRequest)

module.exports = router