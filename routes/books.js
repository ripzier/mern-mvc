const router = require('express').Router()

const bookController = require('../controllers/book')

router.get('/', bookController.list)
router.get('/:_id', bookController.details)
router.post('/', bookController.create)
router.put('/:_id', bookController.update)
router.delete('/:_id', bookController.delete)

module.exports = router