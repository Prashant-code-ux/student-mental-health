const nodemailer = require('nodemailer');

const sendEmail = async(email , subject , message) =>{
    const transporter = nodemailer.createTransport({
        host : 'stmp.gmail.com',
        port:587,
        secure:false,
        auth :{
            user:process.env.MY_EMAIL,
            pass:process.env.EMAIL_PASSWORD
        }
    })
}