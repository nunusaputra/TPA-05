const router = require('express').Router();

const { 
    login, 
    register 
} = require('../controls').users;

router.post('/regis', register);
router.post('/login', login);

module.exports = router;