const LocalStartegy = require('passport-local').Strategy;
// const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


// --------------
module.exports = (passport) => {
    passport.use(
        new LocalStartegy({
            usernameField: 'email'
        }, (email, password, done) => {
            // check if email is register
            User.findOne({
                    email: email
                })
                .then((singleUser) => {
                    // if user is not register
                    if (!singleUser) {
                        return done(null, false, {
                            message: 'that is email ie not register'
                        });
                    } else {
                        //if register
                        bcrypt.compare(password, singleUser.password, (err, isMatch) => {
                            if (err) throw err;

                            if (isMatch) {
                                return done(null, singleUser);
                            } else {
                                return done(null, false, {
                                    message: 'password is not matched'
                                });
                            }
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);

                })
        })
    );


    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}