const UserModel = require('../utils/mongodb.js')

module.exports = function loginController(req, res) {
    UserModel.findOne(req.body.email, 'email password', (err, users) => {
        if(err) {
            console.log(err);
        } else {
            if(users === null){
                res.status(403).send("Email does not exist, please register")
            }else if(users.email === req.body.email.email && users.password === req.body.password.password){
                res.status(200).send("SUCCESS")
            } else {
                res.status(403).send("Incorrect email or password")
            }
        }
    })
}