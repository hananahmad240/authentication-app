const mongosse = require("mongoose");
const USerSchema = mongosse.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

const User = mongosse.model("Users", USerSchema);
module.exports = User;
