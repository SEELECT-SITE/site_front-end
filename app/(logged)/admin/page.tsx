"use client";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import Title from "@/components/Title";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createChangeRoleSchema = z.object({
  email: z
    .string()
    .email("Formato de e-mail invalido")
    .nonempty("Insira um email"),
  role: z
    .string()
    .min(4, "Insira um role valido")
    .nonempty("O role é obrigatorio"),
});

type CreateChangeRole = z.infer<typeof createChangeRoleSchema>;

export default function AdminPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateChangeRole>({
    resolver: zodResolver(createChangeRoleSchema),
  });

  async function changeUserRole(data: CreateChangeRole) {
    const formData = new URLSearchParams();
    formData.append("role", data.role as string);
    formData.append("email", data.email as string);

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/users/changeUserRole/",
        formData.toString(),
        { headers }
      );
    } catch (err: any) {}
  }

  return (
    <div>
      <Title>pagina do admin</Title>
      <Container>
        <form onSubmit={handleSubmit(changeUserRole)}>
          <Input
            placeholder="e-mail"
            type="text"
            register={register("email")}
          />

          <Input placeholder="role" type="text" register={register("role")} />
          <Button className="border border-slate-300 rounded-md">trocar</Button>
        </form>
      </Container>
      <button
        onClick={() => {
          signOut({ redirect: false });
          router.replace("/");
        }}
      >
        sair
      </button>
    </div>
  );
}
