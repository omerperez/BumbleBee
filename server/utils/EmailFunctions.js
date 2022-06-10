const nodemailer = require('nodemailer');
const userSchema = require("../Models/user");

let email = `BumbleBee <bumblebeewebs@gmail.com>`;
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "bumblebeewebs@gmail.com",
    pass: "xtoooaxnmwhcenxa",
  },
});

async function sendEmailNotification(clientId, dealerId, stepNumber) {
  const client = await userSchema.findById(clientId);
  const dealer = await userSchema.findById(dealerId);
  const msg = getMessageToAlert(dealer, client, stepNumber);

  transporter.sendMail(msg, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Email Send!");
  });
}
//userEmail, 
async function sendRegistrationEmail(clientEmail, fullName) {
  const body =
    `<b>Hey ${fullName}, </b>` +
    "<br />" +
    "<b>We're glad you've joined us!</b>" +
    "<br />" +
    " Waiting for you in" +
    "<br />" +
    "http://bumblebee.cs.colman.ac.il:3000" +
    "<br />" +
    "<div style='display: flex; justify-content: center; margin-top: 20px;'>" +
    "<img width='200' src='https://bumblebee-pro.s3.eu-west-1.amazonaws.com/WhatsApp+Image+2022-05-26+at+8.55.53+PM.jpeg'> </img>" +
    "</div>";
      
  const mailOptions = {
    from: email,
    to: clientEmail,
    subject: "Welcome To BumbleBee",
    html: body,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Email Send!");
  });
}

function getMessageToAlert(dealer, client, step) {
  if (step == 1) {
    return {
      from: email,
      to: dealer.email,
      subject: `BumbleBee - New License Request From ${
        client.firstName + " " + client.lastName
      }`,
      html:
        `<b>Hey ${dealer.firstName}, </b>` +
        "<br />" +
        "<br />" +
        `<b>you have new notification from ${client.firstName}</b>` +
        "<br />" +
        "to see the new request" +
        "<br />" +
        "http://bumblebee.cs.colman.ac.il:3000" +
        "<br />" +
        "<div style='margin-top: 20px;'>" +
        "<img width='300' src='https://bumblebee-pro.s3.eu-west-1.amazonaws.com/WhatsApp+Image+2022-05-26+at+8.55.53+PM.jpeg'> </img>" +
        "</div>",
    };
  } else if (step == 2) {
    return {
      from: email,
      to: client.email,
      subject: `BumbleBee -${
        dealer.firstName + " " + dealer.lastName
      } has attach the licenses!`,
      html:
        `<b>Hey ${client.firstName}, </b>` +
        "<br />" +
        "<br />" +
        `<b>you have new notification from ${dealer.firstName}</b>` +
        "<br />" +
        "to see the new request" +
        "<br />" +
        "http://bumblebee.cs.colman.ac.il:3000" +
        "<br />" +
        "<div style='margin-top: 20px;'>" +
        "<img width='300' src='https://bumblebee-pro.s3.eu-west-1.amazonaws.com/WhatsApp+Image+2022-05-26+at+8.55.53+PM.jpeg'> </img>" +
        "</div>",
    };
  } else if ( step == 3) {
    return {
      from: email,
      to: dealer.email,
      subject: `BumbleBee - Shipping Details Request From ${
        client.firstName + " " + client.lastName
      }`,
      html:
        `<b>Hey ${dealer.firstName}, </b>` +
        "<br />" +
        "<br />" +
        `<b>you have new notification from ${client.firstName}</b>` +
        "<br />" +
        "to see the new request" +
        "<br />" +
        "http://bumblebee.cs.colman.ac.il:3000" +
        "<br />" +
        "<div style='margin-top: 20px;'>" +
        "<img width='300' src='https://bumblebee-pro.s3.eu-west-1.amazonaws.com/WhatsApp+Image+2022-05-26+at+8.55.53+PM.jpeg'> </img>" +
        "</div>",
    }; 
  } else {
    return {
      from: email,
      to: client.email,
      subject: `BumbleBee - Purchase process was completed successfully! ${
        dealer.firstName + " " + dealer.lastName
      }`,
      html:
        `<b>Hey ${client.firstName}, </b>` +
        "<br />" +
        "<br />" +
        `<b>you have new notification from ${dealer.firstName}</b>` +
        "<br />" +
        "to see the new request" +
        "<br />" +
        "http://bumblebee.cs.colman.ac.il:3000" +
        "<br />" +
        "<div style='margin-top: 20px;'>" +
        "<img width='300' src='https://bumblebee-pro.s3.eu-west-1.amazonaws.com/WhatsApp+Image+2022-05-26+at+8.55.53+PM.jpeg'> </img>" +
        "</div>",
    }; 
  }
}

module.exports = {
  sendEmailNotification,
  sendRegistrationEmail,
};