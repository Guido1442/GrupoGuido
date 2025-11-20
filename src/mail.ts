import nodemailer from 'nodemailer';
// codigo base: https://nodemailer.com/
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 2525,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.TOKEN_MAIL,
  },
  tls: {
    rejectUnauthorized: false
  }
});


export async function enviarMail(to: string, certificado: string, titulo: string){
  const mailOptions = {
        from: '"AIDA API" <aidadb2025@gmail.com>',
        to: to,
        subject: "Certificado de Titulo en Tramite",
        text: `Felicidades!! Conseguiste el titulo de ${titulo}. Te enviamos tu certificado de titulo en Tramite`, // plain‑text body
        html: certificado,
    };

    return transporter.sendMail(mailOptions);

}
