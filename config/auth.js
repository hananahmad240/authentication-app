 module.exports = {
     ensureAuthenticated: function (req, res, next) {
         if (req.isAuthenticated()) {
             return next();
         }
         req.flash('error_msg', 'please login in to view dashboard');
         res.redirect('/users/login');

     }
 }