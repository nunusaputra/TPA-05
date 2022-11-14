const router = require('express').Router();

router.use('/', require('./users_route'));
router.use('/todos', require('./todo_route'));

module.exports = router;