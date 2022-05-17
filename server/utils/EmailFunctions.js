const nodemailer = require("nodemailer");
const userSchema = require("../Models/user");

async function sendEmailNotification(clientId, dealerId, stepNumber) {
  const client = await userSchema.findById(clientId);
  const dealer = await userSchema.findById(dealerId);
  let transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "omerperez222@gmail.com",
      pass: "omer200198",
    },
  });

  const msg = getMessageToAlert(dealer, client, stepNumber);

  transporter.sendMail(msg, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Send: " + info.response);
  });
}

async function sendRegistrationEmail(userEmail, fullName) {
  let transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "omerperez222@gmail.com",
      pass: "omer200198",
    },
  });
  console.log(userEmail);
  const msg = {
    from: email,
    to: userEmail,
    subject: "Welcome To BumbleBee",
    text: `Hey ${fullName}  We're glad you've joined us! Waiting for you - http://bumblebee.cs.colman.ac.il:3000`,
  };

  transporter.sendMail(msg, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Send: " + info.response);
  });
}

function getMessageToAlert(dealer, client, step) {
  
  let email = `BumbleBee <omerperez222@gmail.com>`;
  
  if (step == 1) {
    console.log(dealer.email)
    return {
      from: email,
      to: dealer.email,
      subject: `BumbleBee - New License Request From ${
        client.firstName + " " + client.lastName
      }`,
      text: `Hey ${dealer.firstName} you have new notification from ${client.firstName} to see the new request - http://bumblebee.cs.colman.ac.il:3000`,
    };
  } else if (step == 2) {
    return {
      from: email,
      to: client.email,
      subject: `BumbleBee -${
        dealer.firstName + " " + dealer.lastName
      } has attach the licenses!`,
      text: `Hey ${client.firstName} you have new notification from ${dealer.firstName} to see the new request - http://bumblebee.cs.colman.ac.il:3000`,
    };
  } else if ( step == 3) {
    return {
      from: email,
      to: dealer.email,
      subject: `BumbleBee - Shipping Details Request From ${
        client.firstName + " " + client.lastName
      }`,
      text: `Hey ${dealer.firstName} you have new notification from ${client.firstName} to see the new request - http://bumblebee.cs.colman.ac.il:3000`,
    }; 
  } else {
    return {
      from: email,
      to: client.email,
      subject: `BumbleBee - Purchase process was completed successfully! ${
        dealer.firstName + " " + dealer.lastName
      }`,
      text: `Hey ${client.firstName} you have new notification from ${dealer.firstName} to see the new request - http://bumblebee.cs.colman.ac.il:3000/login`,
    }; 
  }
}

module.exports = {
  sendEmailNotification,
  sendRegistrationEmail,
};