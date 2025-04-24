import { Toaster } from "@/components/ui/sonner";
import FormChangeRole from "./form-change-role";
import Container from "@/components/Container";

export default function ChangeRole() {
  return (
    <div>
      <Container>
        <div className="m-auto max-w-md py-8 rounded-md bg-dark-cian border border-slate-600">
          <FormChangeRole />
        </div>
      </Container>
      <Toaster />
    </div>
  );
}
