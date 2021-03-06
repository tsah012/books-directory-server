const express = require("express");
const passport = require('passport');
const path = require('path');
const auth = require('./authMiddlewares');
const config = require('../configuration/app');

const router = express.Router();


router.get("/login", auth.isNotAuth, function (req, res) {
    res.sendFile(path.join(config.root, 'client/pages/login/index.html'));
});

router.post("/login", auth.isNotAuth, passport.authenticate('local',
    { successRedirect: '/success-login', failureRedirect: '/failure-login', failureFlash: true }));

router.delete("/logout", auth.isAuth, function (req, res) {
    req.logOut();
    res.send({ status: true });
});

router.get("/register", auth.isNotAuth, function (req, res) {
    res.sendFile(path.join(config.root, 'client/pages/register/index.html'));
});

router.get("/success-login", function (req, res) {
    res.send({ status: true });
});

router.get("/failure-login", function (req, res, next) {
    try {
        errorMessage = req.flash().error[0];
        res.send({ status: false, message: errorMessage });
    } catch (error) {
        error.clientMessage = 'failure-login';
        next(error);
    }
});

module.exports = router;