const express = require('express');
const router = express.Router();
const {
    ensureAuthenticated
} = require('../config/auth');
// login route

router.get('/', (req, res) => {
    res.render('welcome');
})

// dashboard

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        user: req.user
    });
    // console.log(req.user);  default property 

})

module.exports = router;