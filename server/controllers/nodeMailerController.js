require("dotenv").config();
const nodemailer = require("nodemailer");

const { EMAIL_PASSWORD } = process.env;

const sendEmail = (req, res) => {
  // console.log(req.body);
  const { name, message, email } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "farmgoodsfs@gmail.com", // we can change this later, it was the email from my personal project, currently that is all it is used for -Colby
      pass: EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: email,
    to: "farmgoodsfs@gmail.com",
    subject: "Bud Kid Contact form",
    html: `<p>Name: ${name}</p>
    <p>Reply to: ${email}</p>
    <p>Message: ${message}</p>`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.status(409).send("Error occurred sending email");
    } else {
      res.status(200).send("Message Sent!");
    }
  });
};

module.exports = {
  sendEmail,
};
