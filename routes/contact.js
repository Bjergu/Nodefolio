const router = require("express").Router();

router.post("/api/contact", (req, res) => {
    //todo nodemailer
    res.redirect("/")
});

module.exports = {
    router
};