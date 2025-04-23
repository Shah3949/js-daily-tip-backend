// const nodemailer = require("nodemailer");
// // const { randomTipMsg } = require("./emailScheduler");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "shahzebsalahuddin0@gmail.com",
//     // pass: "egbnyvctgzxptwuo", 
//     pass: "gmtmzhadnawwouym", // Use an App Password for Gmail
//   },
// });

// // dynamically adding recipient email address
// const sendTip = (recipientEmail, message, callback) => {
//   const mailOptions = {
//     from: "daily-js-tips <shahzebsalahuddin0@gmail.com>",
//     to: recipientEmail,
//     subject: "Your Daily JavaScript Tip",
//     html: `<p>${message}</p>`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.log("Error:", error);
//     }
//     console.log(`Email sent to ${recipientEmail}: ${info.response}`);
//     if (callback) callback();
//   });
// };
// module.exports = sendTip;




// using oauth2 for mailing tips

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { google } = require("googleapis");

dotenv.config({ path: '../.env' });

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail(recipientEmail , message, tip) {
  try {
    const { token: accessToken } = await oAuth2Client.getAccessToken();
    console.log("✅ Access Token retrieved:", accessToken);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `daily js tip <${process.env.EMAIL}>`,
      to: recipientEmail,
      subject: "JS Daily Tip",
      text: "This email was sent using Gmail API and OAuth2!",
      // html: `<p>${message}</p>`
      html: message,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to : ${recipientEmail} \n Tip --> ${tip}`, result.response );
    
    
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

module.exports = sendMail;
