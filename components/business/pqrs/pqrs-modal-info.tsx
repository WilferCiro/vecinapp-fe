import GenericForm from "@/components/form/generic-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { Separator } from "@/components/ui/separator";
import { addPqrsResponseService } from "@/data/services/pqrs.service";
import {
  PQRS_COLORS,
  PQRS_LIST_QUERY_KEY,
  PQRS_STATUS_TEXT,
  PQRS_TYPE,
} from "@/domain/constants/pqrs.constants";
import { getPqrsResponseForm } from "@/domain/forms/pqrs.form";
import { IPqrs } from "@/domain/types/pqrs.type";
import { useCustomForm } from "@/hooks/use-custom-form";
import { humanizeDate } from "@/utils/date.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface Props {
  pqrs: IPqrs;
}

const PqrsModalInfo = ({ pqrs }: Props) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const fieldsForm = useMemo(
    () => getPqrsResponseForm(pqrs?.pqrsResponses?.[0]?.message || ""),
    [pqrs?.pqrsResponses]
  );
  const { form } = useCustomForm(fieldsForm);

  const mutation = useMutation({
    mutationFn: addPqrsResponseService,
  });

  const sendAnswer = async () => {
    const valid = await form.trigger();
    if (valid) {
      await mutation.mutateAsync({
        message: form.getValues("message"),
        pqrsId: pqrs.id,
      });
      toast.success("Respuesta enviada con éxito");
      queryClient.refetchQueries({ queryKey: [PQRS_LIST_QUERY_KEY] });
      setOpen(false);
    }
  };

  const answer = pqrs?.pqrsResponses?.[0];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          variant={"secondary"}
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Información de {PQRS_TYPE[pqrs.type as keyof typeof PQRS_TYPE]}{" "}
            (Serial {pqrs.id})
          </DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex justify-between gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className="space-y-1 w-full">
              <h4 className="text-sm font-semibold">
                {pqrs.subject}{" "}
                <Badge
                  color={
                    PQRS_COLORS[pqrs.status as keyof typeof PQRS_COLORS] ||
                    "default"
                  }
                >
                  {PQRS_STATUS_TEXT[
                    pqrs.status as keyof typeof PQRS_STATUS_TEXT
                  ] || "Abierto"}
                </Badge>
              </h4>

              <p className="text-sm">{pqrs.description}</p>
              <div className="text-muted-foreground text-xs text-end">
                {pqrs.user.firstName} {pqrs.user.lastName} -{" "}
                {humanizeDate(pqrs.createdAt)}
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between gap-4">
            {answer && (
              <Avatar>
                <AvatarImage src="https://github.com/vercel.png" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
            )}
            <div className="space-y-1 w-full">
              <h4 className="text-sm font-semibold">Respuesta</h4>
              {!answer ? (
                <GenericForm
                  form={form}
                  fields={fieldsForm}
                  className="w-full"
                />
              ) : (
                <>
                  <p className="text-sm">{answer?.message}</p>
                  <div className="text-muted-foreground text-xs text-end">
                    {answer.responder.firstName} {answer.responder.lastName} -{" "}
                    {humanizeDate(answer.createdAt)}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cerrar
            </Button>
          </DialogClose>
          {!answer && (
            <Button
              variant={"default"}
              onClick={sendAnswer}
              className="cursor-pointer"
            >
              Responder
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PqrsModalInfo;
