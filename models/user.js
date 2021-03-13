/**
 * Mongoose schema for user documents
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    personname: String,
    username: {
        type: String,
        min: 4,
        max: 32,
        required: true
    },
    password: {
        type: String,
        min: 4,
        max: 32,
        required: true
    }
});

// middleware function to automatically encrypt password when saving user to DB
userSchema.pre('save', function(next) {
    const user = this;

    // generate new salt
    bcrypt.genSalt(10, (err, salt) => {
        if(err) {
            console.log(err);
            return;
        }

        // use salt to hash password
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) {
                console.log(err);
                return;
            }
            // hashed password gets saved to db
            user.password = hash;
            next(); // call next function in flow
        });
    });
});

/**
 * Method for matching the hashed passwords of two users
 * @param password the hashed password to match against the User objects password
 * @return, a bool indicating if the passwords match
 */
userSchema.methods.passwordsMatch = function(password) {
    return bcrypt.compareSync(password, this.password);
  }

const User = mongoose.model('user', userSchema);
module.exports = User;
