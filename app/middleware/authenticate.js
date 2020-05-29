const { Admin } = require('../model/admin')

const authenticateUser = function(req, res, next){
    const token = req.header('x-auth')
        Admin.findByToken(token)
            .then(function(admin){
                if(admin){
                    req.admin= admin
                    req.token = token
                    next()
                }else{
                    res.status('401').send({notice : "Please login to access"})
                }
                
            })
            .catch(function(err){
                res.status(401).send(err)
            })
}

module.exports = {
    authenticateUser
}