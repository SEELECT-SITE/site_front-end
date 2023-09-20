import { z } from "zod";

export const createCadastroSchema = z
  .object({
    first_name: z.string().nonempty("Digite seu nome"),
    last_name: z.string().nonempty("Digite seu nome"),
    email: z
      .string()
      .nonempty("Email invalido")
      .email("Formato de e-mail invalido"),
    password: z
      .string()
      .min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    { message: "As senhas estão diferentes", path: ["confirmPassword"] }
  );

export type CreateCadastroData = z.infer<typeof createCadastroSchema>;
