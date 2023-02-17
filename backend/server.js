const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

var app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(cors())

const port = process.env.PORT || 3001;

mongoose.set('strictQuery', false);


// main().catch(err => console.log(err));

// async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/user')
// }

const connectDatabase = async () => {
    try {
        await mongoose.connect('mongodb://mongo-db/user')

        console.log("Connected to database")
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

connectDatabase(); 

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    name: {type: String },
    email: {type: String},
    password: {type: String}
})

const UserModel = mongoose.model('users', UserSchema)

app.post('/login', (req, res) => {
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
})

app.post('/register', (req, res) => {
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
})

app.listen(port, () => {
    console.log("Server listening on port " + port + '!')
})