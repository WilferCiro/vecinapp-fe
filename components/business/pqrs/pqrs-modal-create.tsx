import GenericForm from "@/components/form/generic-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { createPqrsService } from "@/data/services/pqrs.service";
import { PQRS_LIST_QUERY_KEY } from "@/domain/constants/pqrs.constants";
import { getPqrsCreateForm } from "@/domain/forms/pqrs.form";
import { useCustomForm } from "@/hooks/use-custom-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const PqrsModalCreate = () => {
  const [open, setOpen] = useState(false);
  const fieldsForm = useMemo(() => getPqrsCreateForm(), []);
  const { form } = useCustomForm(fieldsForm);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPqrsService,
  });

  const create = async () => {
    const valid = await form.trigger();
    if (valid) {
      await mutation.mutateAsync(form.getValues());
      form.reset();
      toast.success("PQRS creado con éxito");
      queryClient.refetchQueries({ queryKey: [PQRS_LIST_QUERY_KEY] });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          variant={"secondary"}
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <Plus /> Nuevo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Crear un nuevo PQRS</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between gap-4">
          <div className="space-y-1 w-full">
            <GenericForm form={form} fields={fieldsForm} className="w-full" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            className="cursor-pointer"
            variant={"default"}
            onClick={create}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Spinner />
                Creando
              </>
            ) : (
              <>Crear</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PqrsModalCreate;
