"use client";
import DefaultModal from "@/components/DefaultModal";
import useKitDeleteModalState from "./deleteKitModalStore";
import { axiosClient } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Text from "@/components/Text";
import SmallText from "@/components/SmallText";

export default function DeleteKitModal({
  token,
  triggerFn,
}: {
  token?: string;
  triggerFn: Function;
}) {
  const { isDeleteModalOpen, setIsDeleteModalOpen, kitDelete } =
    useKitDeleteModalState();
  const { toast } = useToast();
  async function deleteKit() {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Token: token,
    };
    try {
      await axiosClient.delete(`api/kits/${kitDelete?.kitID}/`, {
        headers,
      });
      setIsDeleteModalOpen(false);
      toast({
        title: "Kit deletado com sucesso",
      });
    } catch (e) {
      toast({
        title: "Ocorreu algum problema",
        description: "Tente novamente em breve",
        variant: "destructive",
      });
    }
  }
  return (
    <DefaultModal
      isModalOpen={isDeleteModalOpen}
      setIsModalOpen={setIsDeleteModalOpen}
      className="bg-slate-800"
    >
      <div className="p-4 text-slate-50">
        <div className="mb-6">
          <Text>
            Deseja apagar o kit {kitDelete?.kitID} do usuario{" "}
            {kitDelete?.userID}?
          </Text>
          <SmallText>Clique duas vezes para deletar</SmallText>
        </div>
        <div className="flex gap-4 justify-end">
          <Button onDoubleClick={deleteKit} variant={"destructive"} size={"sm"}>
            Deletar
          </Button>
          <Button onClick={() => setIsDeleteModalOpen(false)} size={"sm"}>
            Cancelar
          </Button>
        </div>
      </div>
    </DefaultModal>
  );
}
