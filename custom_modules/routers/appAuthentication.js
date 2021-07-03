const express = require("express");
const passport = require('passport');
const path = require('path');
const auth = require('./authMiddlewares');
const config = require('../../configuration_settings');

const router = express.Router();


router.get("/login", auth.isNotAuth, function (req, res) {
    res.sendFile(path.join(config.root, 'client/pages/login/index.html'));
});

router.post("/login", passport.authenticate('local',
    { successRedirect: '/success-login', failureRedirect: '/failure-login', failureFlash: true}));

router.delete("/logout", function (req, res) {
    req.logOut();
    res.end();
});

router.get("/register", auth.isNotAuth, function (req, res) {
    res.sendFile(path.join(config.root, 'client/pages/register/index.html'));
});

router.get("/success-login", function (req, res) {
    res.send({ success: true });
});

router.get("/failure-login", function (req, res) {
    try {
        errorMessage = req.flash().error[0]
        res.send({ success: false, message: errorMessage });   
    } catch (error) {
        console.log(error);
        res.end();
    }
});

module.exports = router;