require('dotenv')
import nodemailer from 'nodemailer'

// async..await is not allowed in global scope, must use a wrapper
async function main() {

    let sendSimpleEmail = async(dataSend) => {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.EMAIL_APP, // generated ethereal user
              pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
            },
          });

          let info = await transporter.sendMail({
            from: '"Me 👻" <hthodev@gmail.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Thông tin đặt lịch khám bệnh",
            // Subject line
            html: `<h3> Xin chào ${dataSend.patientName}! </h3>
            <p> Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare </p>
            <p> Thông tin đặt lịch khám bệnh: </p>
            <div><b> Thời gian: ${dataSend.time} </b> </div>
            <div><b> Bác sĩ: ${dataSend.doctorName} </b></div>
            <p> Nếu thông tin trên là đúng sự thật vui lòng click vào đường link dươí để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh </p>
            <div><a herf=${dataSend.redirectLink} target=”_blank”> Click here </a></div>
            <div> Xin chân thành cảm ơn vì đã sử dụng dịch vụ </div>`, // html body
          });
    }
 
   
}

main().catch(console.error);