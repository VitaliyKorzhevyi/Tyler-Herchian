const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
const Joi = require('joi');
require('dotenv').config();

//--------------------------------
app.use(express.json());
app.use(cors());

//-------------------------------------------------------------------------------
const validForm = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    message: Joi.string().min(3).max(200).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: "error validation" });
  }
  next();
};

app.post('/', validForm, (req, res) => {
  const { username, email, message } = req.body;
console.log(username);
console.log(email);
console.log(message);
console.log(process.env.SMTP_USER);
  // Настройка параметров отправки письма
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    // host: process.env.SMTP_HOST,
    // port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // tls: {
    //   rejectUnauthorized: true,
    // },
  });

  const mailOptions = {
    from: `"Fred Foo 👻" ${process.env.SMTP_SENDER}`,  // отправитель
    to: process.env.SMTP_RECIPIENT, // для кого
    subject: 'Новое сообщение с сайта',
    text: `Имя: ${username}\nEmail: ${email}\nСообщение: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('error');
    } else {
      console.log('Email sent: ' + info.response + ' ---  ' + process.env.SMTP_RECIPIENT);
      res.send({'status': 'success'});
    }
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});