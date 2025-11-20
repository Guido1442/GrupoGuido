import nodemailer from 'nodemailer';
// codigo base: https://nodemailer.com/
const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.TOKEN_MAIL,
  },
  connectionTimeout: 120000,
  socketTimeout: 120000,
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
