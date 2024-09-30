import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const seelectEmail = process.env.GMAIL_USER;
const pass = process.env.GMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail", // ou outro serviço de email
  auth: {
    user: seelectEmail, // armazenado em variáveis de ambiente
    pass: pass, // armazenado em variáveis de ambiente
  },
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }
    const mailOptions = {
      from: seelectEmail,
      to: seelectEmail,
      subject: "Uma pessoa está interessada no nosso evento! To Redirect",
      text: `${name} preencheu o formulário!
      Seu telefone é: ${phone}
      Seu email é: ${email}
      ${message ? `Sua mensagem é: "${message}"` : ""}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email enviado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao enviar email", error });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
};
