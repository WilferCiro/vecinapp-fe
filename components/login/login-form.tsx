"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import Image from "next/image";
import GenericForm from "../form/generic-form";
import { useCustomForm } from "@/hooks/use-custom-form";
import { useMemo } from "react";
import { getLoginForm } from "@/domain/forms/login.form";
import { useMutation } from "@tanstack/react-query";
import { loginService, LoginServiceProps } from "@/data/services/login.service";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const fieldsForm = useMemo(() => getLoginForm(), []);
  const { form } = useCustomForm(fieldsForm);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: loginService,
  });

  const login = async () => {
    if (form.formState.isValid) {
      const values = form.getValues() as LoginServiceProps;
      const result = await mutation.mutateAsync(values);
      if (result?.ok) {
        router.push("/dashboard");
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">¡Bienvenido!</h1>
                <p className="text-muted-foreground text-balance">
                  Ingresa con tu cuenta
                </p>
              </div>
              <GenericForm
                className="flex flex-col gap-3"
                fields={fieldsForm}
                form={form}
              />
              <Field>
                <Button
                  type="submit"
                  onClick={login}
                  disabled={mutation.isPending || !form.formState.isValid}
                >
                  {mutation.isPending ? (
                    <>
                      <Spinner />
                      Iniciando sesión
                    </>
                  ) : (
                    <>Iniciar sesión</>
                  )}
                </Button>
              </Field>
              <FieldDescription className="text-center">
                ¿Aún no tienes una cuenta? <a href="#">Regístrate aquí</a>
              </FieldDescription>
            </FieldGroup>
          </div>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/placeholder.svg"
              alt="Image"
              width={400}
              height={400}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Al hacer clic en continuar, aceptas nuestros{" "}
        <a href="#">Términos de Servicio</a> y{" "}
        <a href="#">Política de Privacidad</a>.
      </FieldDescription>
    </div>
  );
}
