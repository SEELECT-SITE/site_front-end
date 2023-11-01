import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Verifique o método HTTP, permitindo apenas POST
  if (req.method === "POST") {
    try {
      // Configurar o transporte do Nodemailer
      const transporter = nodemailer.createTransport({
        service: "Gmail", // Por exemplo, 'Gmail', 'Outlook', etc.
        auth: {
          user: "seu_email",
          pass: "sua_senha",
        },
      });

      // Definir as opções do e-mail
      const mailOptions = {
        from: "seu_email",
        to: "destinatario_email",
        subject: "Confirmação de Pagamento",
        text: "Seu pagamento foi confirmado com sucesso. Obrigado por sua compra!",
      };

      // Enviar o e-mail
      await transporter.sendMail(mailOptions);

      res.status(200).json({
        message: "E-mail de confirmação de pagamento enviado com sucesso",
      });
    } catch (error) {
      console.error("Erro ao enviar o e-mail: " + error);
      res
        .status(500)
        .json({ error: "Erro ao enviar o e-mail de confirmação de pagamento" });
    }
  } else {
    res.status(405).end(); // Método não permitido (não é POST)
  }
};
