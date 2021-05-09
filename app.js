const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const aboutRouter = require("./routes/about.js");
const contactRouter = require("./routes/contact.js");
const frontpageRouter = require("./routes/frontpage.js");
const projectsRouter = require("./routes/projects.js");

app.use(aboutRouter.router);
app.use(contactRouter.router);
app.use(frontpageRouter.router);
app.use(projectsRouter.router);

const fs = require("fs");
const { Console } = require("console");

const header = fs.readFileSync(__dirname + "/public/header/header.html", "utf-8");
const footer = fs.readFileSync(__dirname + "/public/footer/footer.html", "utf-8");

const frontpage = fs.readFileSync(__dirname + "/public/frontpage/frontpage.html", "utf-8");
const projectspage = fs.readFileSync(__dirname + "/public/projects/projects.html", "utf-8");
const contactpage = fs.readFileSync(__dirname + "/public/contact/contact.html", "utf-8");
const aboutpage = fs.readFileSync(__dirname + "/public/about/about.html", "utf-8");


app.get("/", (req, res) => {
    res.send(header + frontpage + footer);
});

app.get("/projects", (req, res) => {
    res.send(header + projectspage + footer);
});

app.get("/contact", (req, res) => {
    res.send(header + contactpage + footer);
});

app.post('/sendemail', (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        host: 'smtp.live.com',
        port: 587,
        secure: false, 
        auth: {
            user: 'artutest@hotmail.com',
            pass: '20TesT20'
        }
    })
    const mailOptions = {
        from: req.body.email,
        to: 'artutest@hotmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.send("Error: " + error);
        }else{
            console.log('Email sent: ' + info.response)
            res.send('success')
        }
    })
});

app.get("/about", (req, res) => {
    res.send(header + aboutpage + footer);
});


const server = app.listen(process.env.PORT || 8080, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("The server is running on", server.address().port);
});