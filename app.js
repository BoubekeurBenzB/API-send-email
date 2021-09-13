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
app.post("/", (req, res) => {
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
    to: "boukidev@gmail.com",
    subject: req.body.subject,
    html: "<p>Api send mail is Done !</p>",
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
