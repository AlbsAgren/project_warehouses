/**
 * Module for managing user authentication, uses express-session for session management
 */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');

const router = express.Router();

// use body parser middleware to parse request bodies
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// set cors header
router.use(cors({ origin: true, credentials: true }));

// import mongoose user model
const User = require('../models/user');

// POST add new user
router.post('/new', (req, res) => {
    // disallow unauthenticated users
    if(!req.session.user || !req.session.user.loggedIn === true) {
        res.status(403).send();
        return;
    }

    const user = req.body;

    // dont accept missing usernames or passwords
    if(!user.username || !user.password) {
        res.status(422).send({ message: "missing username or passoword" });
    } else {
        // disallow duplicate users
        User.findOne({ username: user.username }, (err, result) => {
            if(err) {
                res.status(400).send(err);
            } else if(result) {     // if a result is found, user already exists
                res.status(422).send({ message: "user already exists " });
            } else {
                const newUser = new User(user);

                newUser.save(err, doc => {
                    if(err) {
                        res.status(400).send(err);
                    } else {
                        res.status(200).send({ registered: true });
                    }
                });
            }
        });
    }
});

// POST attempt to log in user
router.post('/authenticate', (req, res) => {
    const user = req.body;

    if(!user.username || !user.password) {
        res.status(422).send({ message: "missing username or passoword" });
    } else {
        // query database for matching user
        User.findOne({ username: user.username }, (err, match) => {
            if(err) {
                res.status(400).send(err);
            } else if(!match) {
                res.status(422).send({ message: "user does not exist" });
            // if match is found and passwords match, create new session and send user info to client
            } else if(match.passwordsMatch(user.password)) {
                sessionData = req.session;
                sessionData.user = {
                    personname: match.personname,
                    username: match.username,
                    loggedIn: true
                }
                res.status(200).json({ 
                    loggedIn: true, 
                    personname: match.personname, 
                    username: match.username 
                });
            } else {
                res.status(422).send({ message: "username and password do not match" });
            }
        });
    }
});

// GET discern if client is currently logged in
router.get('/authenticate', (req, res) => {
    if(req.session.user && req.session.user.loggedIn === true) {
        res.status(200).json({ 
            loggedIn: true,
            personname: req.session.user.personname,
            username: req.session.user.username
        });
    } else {
        res.status(200).json({ loggedIn:  false });
    }
});

// DELETE log out user
router.delete('/authenticate', (req, res) => {
    req.session.destroy(( ) => {
       res.status(200).send();     
    });
});

// export router object for use with app.js
module.exports = router;
