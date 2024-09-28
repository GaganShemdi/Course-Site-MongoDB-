
const { Admin } = require ("../db");

function adminMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.username;
    
    Admin.findOne({
        username: username,
        password : password
    })
    .then(function(value){
       if(value) {
            next();
       }  else {
        res.status(403).json({
            msg: "User doesmt exist"
        })
       }   
    })
}

module.exports = adminMiddleware;