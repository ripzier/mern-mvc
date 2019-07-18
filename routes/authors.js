const router = require('express').Router()

const authorController = require('../controllers/author')

router.get('/', authorController.list)
router.get('/:_id', authorController.details)
router.post('/', authorController.create)
router.put('/:_id', authorController.update)
router.delete('/:_id', authorController.delete)

module.exports = router