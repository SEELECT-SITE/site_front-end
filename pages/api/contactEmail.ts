import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // ou outro serviço de email
  auth: {
    user: process.env.GMAIL_USER, // armazenado em variáveis de ambiente
    pass: process.env.GMAIL_PASS, // armazenado em variáveis de ambiente
  },
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, email, phone, message } = req.body;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "seelect2023@gmail.com",
      subject: "Uma pessoa está interessada no nosso evento! To Redirect",
      text: `O usuário ${name} preencheu o formulário!
      Seu telefone é: ${phone}
      Seu email é: ${email}
      ${req.body.message ? `Sua mensagem é: "${message}"` : ""}
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
