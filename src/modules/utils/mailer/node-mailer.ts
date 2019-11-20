import nodemailer from 'nodemailer'

export async function Mailer(email: string, url: string) {
    const account = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });
    const mailOptions = {
        from: '"Fred Foo🙃"<foo@example.com>',
        to: email,
        subject: "Email Confirmation 🌀✅",
        text: "please click link below here",
        html: `<a href="${url}">${url}</a>`
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Message send: %s", info.messageId)
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}