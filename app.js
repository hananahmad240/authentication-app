const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const flash = require('connect-flash');
const session = require('express-session'); // all messages store here redirect
const passport = require('passport');
const app = express();
require('./config/passport')(passport);
// db config
const db = require("./config/keys").MongoURI;
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: false,
		useFindAndModify: true,
		useUnifiedTopology: true,
	})
	.then((res) => {
		console.log("MongoDB connected");
	})
	.catch((err) => console.log(err));

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set('views', 'views');
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
	// cookie:{secure:true}
}));

// passport sesiion

app.use(passport.initialize());
app.use(passport.session());
// for flash messages
app.use(flash());

// global variable

app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
})

// Index routes
app.use("/", require("./routes/index"));
// users route
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running ion loaclhost ${PORT}`);
});