// import modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
// create express app and use modules
const app = express();
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Running...");
});
// API REST: POST methode
app.post("/api/send/v1", (req, res) => {
  // create transporter, a methode of send email: here is SMTP methode
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "boukidev@gmail.com",
      pass: " Boubou06!",
    },
  });
  // create message configuration
  let mailOptions = {
    from: req.body.fromEmail,
    to: "boubekeur.benzaid@gmail.com",
    subject: req.body.subject,
    html: `<p>First name: ${req.body.firstName}<br />
    Last name: ${req.body.lastName}<br />
    Email adress: ${req.body.fromEmail}<br />
    Phone number: ${req.body.phone}<br />
    Company: ${req.body.company}<br />
    message: ${req.body.message}</p>`,
  };
  // methode send email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log(info);
  });
  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  res.send(req.body);
});

module.exports = app;
