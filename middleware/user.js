
const {User} = require("../db");
function userMiddleware(req, res, next) {
   const username = req.headers.username;
   const password = req.headers.username;

   User.findOne({
    username:username,
    password:password
   })
   .then(function(value){
    if(value){
        next();
    }else {
        res.status(403).json({
            msg:"Users not Exist"
        })
    }
   })

   
}

module.exports = userMiddleware;