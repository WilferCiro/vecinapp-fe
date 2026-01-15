import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { deletePqrsService } from "@/data/services/pqrs.service";
import { PQRS_LIST_QUERY_KEY } from "@/domain/constants/pqrs.constants";
import { IPqrs } from "@/domain/types/pqrs.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface Props {
  pqrs: IPqrs;
}

export function PqrsModalDelete({ pqrs }: Props) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deletePqrsService,
  });

  const deletePqrs = async () => {
    await mutation.mutateAsync({ id: pqrs.id });
    toast.success("Registro eliminado con éxito");
    queryClient.refetchQueries({ queryKey: [PQRS_LIST_QUERY_KEY] });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"sm"} variant={"destructive"} className="cursor-pointer">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Está seguro de eliminar este PQRS (serial {pqrs.id})?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no puede ser revertida, asegurate de que estás seguro de
            eliminar el PQRS con asunto: {pqrs.subject}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            type="submit"
            className="cursor-pointer"
            onClick={deletePqrs}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Spinner />
                Eliminando
              </>
            ) : (
              <>Eliminar</>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
