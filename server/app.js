const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');
const { jwtKey } = require('./config/token');

const mongoDBURL = ""; // MongoDB server URL
const mongoose = require('mongoose');
mongoose.connect(mongoDBURL);
mongoose.connection
    .on('error', err => console.error('Connection error:', err)) // connection failure
    .once('open', () => console.log("Connection is open...")); // connecting the database successfully

const User = require("./models/User");

app.use(cors({
    origin: 'http://localhost:3000' // allow cross-origin resource sharing(cors) only for localhost:3000
}));

app.use(express.json()); // recognize the incoming Request Object as a JSON Object

const authentication = (req, res, next) => {
    const auth = req.headers['authorization'] || "";
    const token = auth.replace('Bearer ', '');

    try {
        req.payload = jwt.verify(token, jwtKey);
    }
    catch (e) {
        console.log(e);
        return res.send({auth: false, error: {msg: "unauthorized"}});
    }

    next();
};

app.get('/api/products', (req, res) => {
    res.header("Content-Type", 'application/json');
    res.sendFile(__dirname + '/public/product_list.json');
});

app.get('/user', authentication, async(req, res) => {
    let user;

    try {
        user = await User.findOne({username: req.payload.username}).exec();
    }
    catch (e) {
        throw e;
    }

    if (!user) {
        return res.send({auth: false, error: {msg: "unauthorized"}});
    }

    res.send({auth: true, username: user.username});
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    let user;
    try {
        user = await User.findOne({username}).exec();
    }
    catch(e) {
        console.log(e);
        throw e;
    }

    if (!user) {
        return res.status(401).send({error: {msg: "username/password is wrong"}});
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(401).send({error: {msg: "username/password is wrong"}});
    }

    const payload = {
        id: user._id,
        username
    };
    
    const token = jwt.sign(payload, jwtKey, {expiresIn: '1h'}); // generate JsonWebToken, expire after 1 hour

    return res.send({message: 'Login successfully', token});
});

app.post('/signup', 
    body('username').trim().isLength({min: 6}).withMessage('Username must have at least 6 characters'),
    body('password').trim().isLength({min: 8}).withMessage('Password must have at least 8 characters')
        .matches(/[a-z]/).withMessage('Password must have at least 1 lowercase letter')
        .matches(/[A-Z]/).withMessage('Password must have at least 1 uppercase letter')
        .matches(/[0-9]/).withMessage('Password must have at least 1 number'),
    body('rePassword').trim().custom((value, {req}) => { // custom validation
        if (value !== req.body.password) {
            throw new Error('Two passwords do not match');
        }
        return true;
    }),
    async (req, res) => {
        const { username, password } = req.body;
        const validationResults = validationResult(req);
        
        if (!validationResults.isEmpty()) {
            return res.status(422).send({error: validationResults.errors[0]}); // if there are errors, return error message
        }

        try { 
            const salt = await bcrypt.genSalt(10); // generate salt
            const hashedPassword = await bcrypt.hash(password, salt); // hash password
            await User.create({username, password: hashedPassword});
            res.send({msg: 'Signup successfully'});
        }
        catch(e) {
            console.log(e);
            if (e.code === 11000) {
                return res.status(400).send({error: {msg: 'Account already exists'}});
            }
            throw e;
        }
});

app.listen(3001);