const express = require('express');
const router = express.Router();
const data = require('../data/users.json');


const protectionLayer_requiredLogin = (req, res, next) => {
    if (req.session.userID) next();
    else res.redirect('/login');
}

const getUser = (req, res, next) => {
    let user = data.find(u => u.id === req.session.userID);
    res.locals.user = user;
    next();
}


router.route('/home').get(protectionLayer_requiredLogin, getUser, (req, res) => {
    console.log(req.session);
    res.status(200).contentType('text/html').send(`
        <h1>Home</h1>
        <h3>Welcome ${res.locals.user.name}</h3>
        <span>Email: ${res.locals.user.email}</span>
        <form method="POST" action="/logout">
            <button type="submit">Logout</button>
        </form>
    `);
});

router.route('/login')
    .get((req, res) => {
        res.status(200).contentType('text/html').send(`
            <h1>Login</h1>
            <form method="POST" action="/login">
                <input type="email" name="email" placeholder="Enter email" required>
                <input type="password" name="password" placeholder="Enter password" required>
                <button type="submit">Login</button>
            </form>
        `);
    })
    .post((req, res) => {
        let user = data.find(u => u.email === req.body.email && u.password === req.body.password);
        if (user) {
            console.log('sucessful login');
            req.session.userID = user.id;
            res.redirect('/home');
        } else {
            console.log('unsuccessfully login attempt');
            res.redirect('/login');
        }
    });

router.route('/logout').post(protectionLayer_requiredLogin, (req, res) => {
    req.session.destroy(err => {
        if (!err) res.redirect('/login');
    });
});

module.exports = router;