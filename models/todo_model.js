const Schema = require('mongoose').Schema;

module.exports = new Schema({
	id: Number,
	title: {
		type: String,
		required: true,
	},
	desc: String,
	status: { 
        type: Boolean, 
        default: false 
    },
	author: Schema.Types.ObjectId,
});