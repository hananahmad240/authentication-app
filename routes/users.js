const express = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/User");

const passport = require('passport');
const router = express.Router();
router.get("/login", (req, res) => {
    res.render("login");
});

// register route
router.get("/register", (req, res) => {
    res.render("register");
});

// logout

router.get("/logout", (req, res) => {
    req.logOut();
    req.flash('success_msg', 'you are logged out');
    res.redirect('/users/login');
});

router.post("/register", (req, res) => {
    const {
        name,
        email,
        password,
        password2
    } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({
            msg: "Please Complete all the Fields",
        });
    }

    if (password2 !== password) {
        errors.push({
            msg: "Password Does Not Match",
        });
    }

    if (password.length < 6) {
        errors.push({
            msg: "Password Should be at least 6 characters",
        });
    }

    if (errors.length > 0) {
        res.render("register", {
            name,
            email,
            errors,
        });
    } else {
        // res.send("pass");
        // validation passed
        User.findOne({
            email: email
        }).then((user) => {
            // if user exits
            if (user) {
                errors.push({
                    msg: "Email Is already exits",
                });
                res.render("register", {
                    name,
                    email,
                    errors,
                });
            } else {
                // if users is not exits
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password,
                });
                // hash password
                bcryptjs.genSalt(10, (err, salt) => {
                    bcryptjs.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash;
                        newUser
                            .save()
                            .then((singleUser) => {
                                req.flash("success_msg", "Your are new register message")
                                res.redirect("/users/login");
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    });
                });
                console.log(newUser);
                // res.send("passs");
            }
        });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
})
module.exports = router;