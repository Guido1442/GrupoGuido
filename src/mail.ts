import nodemailer from 'nodemailer';
// codigo base: https://nodemailer.com/
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  },
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
