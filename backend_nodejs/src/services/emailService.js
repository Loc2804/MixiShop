require('dotenv').config();
const imaps = require('imap-simple');
const { simpleParser } = require('mailparser'); // Dùng để phân tích nội dung email
const nodemailer = require("nodemailer");

const config = {
    imap: {
        user: process.env.EMAIL_APP, // Tài khoản email của bạn
        password: process.env.EMAIL_APP_PASSWORD, // Mật khẩu ứng dụng
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        authTimeout: 3000
    }
};

let sendEmail = async (data) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Bạn có thể dùng các dịch vụ khác
            auth: {
                user: process.env.EMAIL_APP, // Địa chỉ email của bạn
                pass: process.env.EMAIL_APP_PASSWORD // Mật khẩu ứng dụng
            }
        });

        // Tạo nội dung email
        const mailOptions = {
            from: `${data.email}`, // Địa chỉ người gửi
            to: `${process.env.EMAIL_APP}`, // Địa chỉ nhận
            subject: 'Phản hồi từ người dùng', // Tiêu đề email
            html: `
                <h3>Tên người gửi: ${data.name}</h3>
                <p>Email: ${data.email}</p>
                <p>Số điện thoại: ${data.phone}</p>
                <p>Nội dung gửi: ${data.content}</p>
            `
        };

        // Gửi email
        const info = await transporter.sendMail(mailOptions);

        return {
            errCode: 0,
            message: 'Email is sent successfully!',
            info: info
        };
    } catch (error) {
        return {
            errCode: 2,
            message: 'Failed to send email!',
            error: error
        };
    }
};

let sendEmailToUser = async(email) =>{
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: process.env.EMAIL_APP,
              pass: process.env.EMAIL_APP_PASSWORD,
            },
          });
          
        const info = await transporter.sendMail({
            from: '" NGUYEN TAN LOC 👻" <nguyenloc02082004@gmail.com>', // sender address
            to: email, // list of receivers
            subject:  "Thông tin đặt lại mật khẩu",
            html: getBodyEmail(),
        });  
        return {
            errCode: 0,
            message: 'Please check your email to see the password!',
            info: info
        };
    } catch (error) {
        return({
            errCode: 2,
            message: 'Failed to find password!',
            error: error
        })
    }
}

let getBodyEmail = () =>{
    let result = '';
        result = `
            <h3>Mật khẩu của bạn hiện tại đã được đặt về là: 1 </h3>
            <h3>Đăng nhập vào hệ thống và đổi mật khẩu bạn mong muốn</h3>
            <h3>Vui lòng không trả lời email này !</h3>
            <h3>Xin chân thành cảm ơn!</h3>
        `; // html body
    return result;
}

module.exports ={
    sendEmail:sendEmail,
    sendEmailToUser:sendEmailToUser,
}

