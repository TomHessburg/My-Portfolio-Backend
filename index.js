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
  console.log(req.body);
  const data = req.body;

  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: "thomas.hessburg@gmail.com",
      pass: process.env.DB_PASS
    }
  });

  const mailOptions = {
    from: data.email,
    to: "thomas.hessburg@gmail.com",
    subject: `${
      data.subject.length
        ? data.subject
        : "IMPORTANT! POTFOLIO CONTACT FORM SUBMISSION"
    }`,
    html: `<p>${data.name}</p>
          <p>${data.email}</p>
          <p>${data.content}</p>`
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
