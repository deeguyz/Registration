const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectDatabase = async function() {
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

module.exports = UserModel = mongoose.model('users', UserSchema)
