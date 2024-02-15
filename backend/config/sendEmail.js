const nodemailer = require("nodemailer");

const sendEmail = async (email,text, link ) => {  
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'khumanchingtham123@gmail.com',
              pass: 'xiag znjj gzon zzcp'
            }
          });
          
          var mailOptions = {
            from: 'khumanchingtham123@gmail.com',
            to: 'waithouchingtham@gmail.com',
            subject: 'Sending Email'+text,
            text: 'That was easy! '+link
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};



module.exports = sendEmail;