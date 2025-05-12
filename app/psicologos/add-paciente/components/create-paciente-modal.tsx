"use client";
import { Dispatch, SetStateAction } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Plus, PlusCircle } from "lucide-react";

import { z } from "zod";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {  } from "axios"

type IcreatePacienteProps = {
  isOpen: boolean;
  onSetIsCreatePacienteModalOpen: Dispatch<SetStateAction<boolean>>;
};

const createPacienteFormSchema = z.object({
  nome: z.string().min(1, "O campo nome é obrigatório"),
  cpf: z.string().min(11, "O campo CPF deve ter no mínimo 11 caracteres"),
  email: z.string().email("O campo email deve ser um email válido"),
  telefone: z.string().optional(),
  dataNascimento: z.string().min(1, "O campo data de nascimento é obrigatório"),
  endereco: z.string().optional(),
});

type IcreatePaciente = z.infer<typeof createPacienteFormSchema>;

type Ipaciente = {
  id: number;
  name: string;
  abbreviation: string;
};

const CreatePacienteModal = ({
  isOpen,
  onSetIsCreatePacienteModalOpen,
}: IcreatePacienteProps) => {
  const queryClient = useQueryClient();

  const { data: departments } = useQuery<Ipaciente[]>({
    queryKey: ["pacientes"],
    queryFn: async (): Promise<Ipaciente[]> => {
      const response = await api.get(`/create-paciente`);

      return response.data as Ipaciente[];
    },
    enabled: isOpen,
  });

  const methods = useForm<IcreatePaciente>({
    resolver: zodResolver(createPacienteFormSchema),
    defaultValues: {
      nome: "",
      cpf: "",
      email: "",
      telefone: "",
      dataNascimento: "",
      endereco: "",
    },
  });

  const {
    reset,
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = methods;

  const handleCreateService = async (data: IcreatePaciente) => {
    try {
      const response = await api.post<{ message: string }>(
        "/create-paciente",
        data
      );

      const { message } = response.data;

      if (response.status !== 201) {
        return toast.error("Erro", {
          description: message,
        });
      }

      toast.success("Sucesso", {
        description: message,
      });

      queryClient.invalidateQueries({
        queryKey: ["pacientes"],
      });

      reset();

      return onSetIsCreatePacienteModalOpen(false);
    } catch (error) {
      const typedError = error as { response?: { data: { message?: string } } };

      const errorMessage =
        typedError?.response?.data?.message ?? "Erro desconhecido";

      toast.error("Erro", {
        description: errorMessage,
      });
    }
  };

  const isDisabled = isSubmitting;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex items-center">
          <PlusCircle className="size-5 mr-2" />
          Adicionar Paciente
        </DialogTitle>
        <DialogDescription>
          Preencha os campos para adicionar um novo paciente.
        </DialogDescription>
      </DialogHeader>
      <div>
        <Form {...methods}>
          <form
            onSubmit={handleSubmit(handleCreateService)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input placeholder="000.000.000-00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@exemplo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="(00) 00000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="dataNascimento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="endereco"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Rua, número, bairro, cidade..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                className="self-end cursor-pointer"
                onClick={() => onSetIsCreatePacienteModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="self-end bg-blue-500 hover:bg-blue-600 cursor-pointer"
                disabled={isSubmitting}
              >
                <Plus className="size-4" />
                Criar Paciente
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};

export default CreatePacienteModal;
