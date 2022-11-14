const mongoose = require('mongoose');

module.exports = {
	todos: mongoose.model('todos', require('./todo_model')),
	user: mongoose.model('users', require('./users_model')),
};