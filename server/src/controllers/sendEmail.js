import nodemailer from "nodemailer"

const sendOTPEmail = async (email, otp) => {

   try {


      
      // let transporter = await nodemailer.createTransport({

      //    host: 'smtp.gmail.com',
      //    port: 587,
      //    secure: false, // Use TLS
      //    auth: {
      //       user: 'guduughuge7@gmail.com',
      //       pass: 'hqivpnjhzjjlredn'
      //    }
      // });
      
      
 

      const transporter = nodemailer.createTransport({

         // service: 'gmail', 
         host: 'smtp.gmail.com',
         port: 587,
         secure: false, 
         auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASSWORD //process.env.PASSWORD
         }
      });
   
      const mailOptions = {
         from: process.env.EMAIL_USER, 
         to: email,                    
         subject: 'Your OTP Code From NaukariSource.com',
         text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
      };
   
      await transporter.sendMail(mailOptions);
   
      return true;

   } 
   catch (error) {
      return false;
   }

};


export {
   sendOTPEmail
}