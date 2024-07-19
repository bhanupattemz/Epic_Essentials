const nodemailer = require("nodemailer");
async function  sendMail(options){
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "epicessentialstores@gmail.com",
      pass: "cnmtdjloaasjqhll",
    },
  });


  async function main() {
    try {
      console.log("Try Block", options)
      const info = await transporter.sendMail({
        from: "epicessentialstores@gmail.com",
        to: options.mail,
        subject: options.subject,
        text: options.text,
        html: `${options.message}`,
      });
      console.log("Message sent: %s", info.messageId);
      return true
    } catch (error) {
      return false
      console.log(error)
    }
  }
  return main()
}
module.exports = sendMail

