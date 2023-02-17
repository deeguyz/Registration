const UserModel = require('../utils/mongodb.js')

module.exports = function registerController(req, res) {
    console.log(req.body)
    UserModel.findOne(req.body.email, 'email password', (err, users) => {
        if(err) {
            console.log(err);
        } else {
            if(users === null){
                UserModel.create({
                    name: req.body.name.name,
                    email: req.body.email.email,
                    password: req.body.password.password
                })
                res.status(201).send("User successfully created")
            } else {
                res.status(223).send("User already exists")
            }
        }
    })
}