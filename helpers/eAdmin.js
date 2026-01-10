module.exports = {
    eAdmin: function(req, res, next){

        if(req.isAuthennticated() && req.user.eAdmin == 1){
            return next();
        }

        req.flash("error_msg", "você precisa ser um Admin")
        res.redirect("/")

    }
}