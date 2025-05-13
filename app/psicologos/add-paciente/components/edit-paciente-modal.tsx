'use client'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useQueries, useQueryClient } from '@tanstack/react-query'
import { CheckCircle2, Edit } from 'lucide-react'

import { z } from 'zod'
import { api } from '@/lib/axios'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AxiosError } from 'axios'

const editPacieneBodySchema = z.object({
    nome: z.string().min(1, {
        message: 'O nome é um campo obrigatório',
    }),
    cpf: z.string().min(11, {
        message: 'O CPF deve ter no mínimo 11 caracteres',
    }),
    email: z.string().email({
        message: 'O email deve ser válido',
    }),
    telefone: z.string().optional(),
    dataNascimento: z.string().refine(
        (value) => !isNaN(Date.parse(value)),
        { message: 'A data de nascimento deve ser válida' }
    ),
    endereco: z.string().optional(),
})

type IeditService = z.infer<typeof editPacieneBodySchema>

type Ipaciente = {
    nome: string
    cpf: string
    email: string
    telefone?: string
    dataNascimento: string
    endereco?: string
}


type IeditPacienteModalProps = {
  id: number | null
  isOpen: boolean
  onSetIsEditPacienteModalOpen: Dispatch<SetStateAction<boolean>>
}

const EditPacienteModal = ({
  id,
  isOpen,
  onSetIsEditPacienteModalOpen,
}: IeditPacienteModalProps) => {
  const queryClient = useQueryClient()

  const [PacienteResult] = useQueries({
    queries: [
      {
        queryKey: ['paciente', id],
        queryFn: async () => {
          const response = await api.get(`/create-paciente/${id}`)

          return response.data
        },
        enabled: isOpen,
      },
    ],
  })

const paciente = PacienteResult.data as Ipaciente

  const methods = useForm<IeditService>({
    resolver: zodResolver(editPacieneBodySchema),
  })

  const {
    reset,
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = methods

useEffect(() => {
    reset({
        nome: paciente?.nome || '',
        cpf: paciente?.cpf || '',
        email: paciente?.email || '',
        telefone: paciente?.telefone || '',
        dataNascimento: paciente?.dataNascimento || '',
        endereco: paciente?.endereco || '',
    })
}, [isOpen, paciente])

  const handleUpdatePaciente = async (data: Ipaciente) => {
    try {
      const response = await api.put(`/create-paciente/${id}`, data)

      const { message } = response.data as { message: string }

      if (response.status !== 200) {
        return toast.error('Erro', {
          description: message,
        })
      }

      toast.success('Sucesso', {
        description: message,
      })

      queryClient.invalidateQueries({
        queryKey: ['pacientes'],
      })

      reset()

      return onSetIsEditPacienteModalOpen(false)
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro desconhecido'

      toast.error('Erro', {
        description: errorMessage,
      })
    }
  }

  const isDiasbled = isSubmitting || !paciente

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle className="flex items-center">
          <Edit className="size-5 mr-2 text-blue-500" />
          Editar Serviço
        </DialogTitle>
        <DialogDescription>
          Atualize as informações do servico no formulário abaixo.
        </DialogDescription>
      </DialogHeader>

      <Form {...methods}>
        <form
          onSubmit={handleSubmit(handleUpdatePaciente)}
          className="space-y-6 py-4"
        >
          <div className="grid grid-cols-1 gap-6">
            <FormField
              control={control}
              name="nome"
              render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  disabled={isDiasbled}
                  placeholder="Nome do paciente"
                  {...field}
                />
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
                <Input
                  disabled={isDiasbled}
                  placeholder="CPF do paciente"
                  {...field}
                />
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
                  disabled={isDiasbled}
                  placeholder="Email do paciente"
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
                <Input
                  disabled={isDiasbled}
                  placeholder="Telefone do paciente"
                  {...field}
                />
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
                <Input
                  type="date"
                  disabled={isDiasbled}
                  {...field}
                />
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
                <Input
                  disabled={isDiasbled}
                  placeholder="Endereço do paciente"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isDiasbled}
              onClick={() => onSetIsEditPacienteModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isDiasbled}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <CheckCircle2 className="mr-2 size-4" />
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
          </Form>
        </DialogContent>
      )
    }

    export default EditPacienteModal
