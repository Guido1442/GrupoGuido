import nodemailer from 'nodemailer';
// codigo base: https://nodemailer.com/
interface fromPorEstado{
  estado:string,
  from:string
}

const fromPorEstado:fromPorEstado[] = [
  {estado: '0', from: '"AIDA API" <aidadb2025@gmail.com>'},
  {estado: '1', from: '"AIDA API" <noreply@aida.com>'}
]

let transporter:any;
if(process.env.esRender != '1'){
 transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.TOKEN_MAIL,
    },
  });

}
else{
  transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.TOKEN_MAIL,
    },
  });
}

export async function enviarMail(to: string, certificado: string, titulo: string){
    const mailOptions = {
          from: fromPorEstado.find(e => e.estado === process.env.esRender)?.from,
          to: to,
          subject: "Certificado de Titulo en Tramite",
          text: `Felicidades!! Conseguiste el titulo de ${titulo}. Te enviamos tu certificado de titulo en Tramite`, // plain‑text body
          html: certificado,
      };

      return transporter.sendMail(mailOptions);
  }



