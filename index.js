const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(cors());

server.get("/", (req, res) => {
  res.status(200).send("Running!");
});

server.post("/api/send-email", (req, res) => {
  const data = req.body;

  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: "thomas.hessburg@gmail.com",
      pass: process.env.DB_PASS
    }
  });

  const output = `
    <h3>You've got a new message request!</h3>
    <h4>from: ${data.name}, email: ${data.email} </h4>
    <h4>content:</h4>
    <p>${data.content}</p>
  `;

  const mailOptions = {
    from: `${data.name} <${data.email}>`,
    to: "thomas.hessburg@gmail.com",
    subject: `${
      data.subject.length
        ? data.subject
        : "IMPORTANT! POTFOLIO CONTACT FORM SUBMISSION"
    }`,
    html: output
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Success");
    }
    smtpTransport.close();
  });
});

server.listen(5000, () => {
  console.log("server listening on port 5000");
});
