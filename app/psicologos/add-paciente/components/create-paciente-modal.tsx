// 'use client'

// import { Plus, PlusCircle } from 'lucide-react'
// import { useForm } from 'react-hook-form'
// import { z } from 'zod'
// import { api } from '@/lib/axios'
// import { toast } from 'sonner'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useQueryClient } from '@tanstack/react-query'

// import {
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from '@/components/ui/dialog'

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'

// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import { Button } from '@/components/ui/button'

// type CreatePacienteModalProps = {
//   isOpen: boolean
//   onSetIsCreatePacienteModalOpen: (open: boolean) => void
// }

// const createPacienteFormSchema = z.object({
//   nome: z.string().min(1, 'O campo nome é obrigatório'),
//   cpf: z.string().min(11, 'CPF deve ter no mínimo 11 caracteres'),
//   email: z.string().email('Insira um e-mail válido'),
//   telefone: z.string().optional(),
//   dataNascimento: z.string().min(1, 'Data de nascimento é obrigatória'),
//   endereco: z.string().optional(),
// })

// type CreatePacienteFormData = z.infer<typeof createPacienteFormSchema>

// const CreatePacienteModal = ({
//   onSetIsCreatePacienteModalOpen,
// }: CreatePacienteModalProps) => {
//   const queryClient = useQueryClient()

//   const methods = useForm<CreatePacienteFormData>({
//     resolver: zodResolver(createPacienteFormSchema),
//     defaultValues: {
//       nome: '',
//       cpf: '',
//       email: '',
//       telefone: '',
//       dataNascimento: '',
//       endereco: '',
//     },
//   })

//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { isSubmitting },
//   } = methods

//   const handleCreatePaciente = async (data: CreatePacienteFormData) => {
//     try {
//       // Converte a dataNascimento para o formato Date antes de enviar
//       const payload = {
//         ...data,
//         dataNascimento: new Date(data.dataNascimento).toISOString().split('T')[0], // Formato YYYY-MM-DD
//       }

//       console.log('Payload enviado:', payload)

//       const response = await api.post('/api/create-paciente', payload)

//       const { message } = response.data

//       if (response.status !== 201) {
//         return toast.error('Erro', { description: message })
//       }

//       toast.success('Paciente criado com sucesso', { description: message })

//       queryClient.invalidateQueries({ queryKey: ['pacientes'] })
//       reset()
//       onSetIsCreatePacienteModalOpen(false)
//     } catch (error) {
//       const errorMessage =
//         (error as any)?.response?.data?.message ?? 'Erro desconhecido'
        
//       toast.error('Erro ao criar paciente', {
//         description: errorMessage,
//       })
//     }
//   }

//   return (
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle className="flex items-center">
//           <PlusCircle className="size-5 mr-2" />
//           Adicionar Paciente
//         </DialogTitle>
//         <DialogDescription>
//           Preencha os campos para adicionar um novo paciente.
//         </DialogDescription>
//       </DialogHeader>

//       <Form {...methods}>
//         <form
//           onSubmit={handleSubmit(handleCreatePaciente)}
//           className="flex flex-col gap-6"
//         >
//           <FormField
//             control={control}
//             name="nome"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Nome</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Nome completo" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={control}
//             name="cpf"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>CPF</FormLabel>
//                 <FormControl>
//                   <Input placeholder="000.000.000-00" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="email"
//                     placeholder="email@exemplo.com"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={control}
//             name="telefone"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Telefone</FormLabel>
//                 <FormControl>
//                   <Input placeholder="(00) 00000-0000" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={control}
//             name="dataNascimento"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Data de Nascimento</FormLabel>
//                 <FormControl>
//                   <Input type="date" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={control}
//             name="endereco"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Endereço</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Rua, número, bairro, cidade..."
//                     {...field}
//                     className="h-32 max-h-32 min-h-32"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <DialogFooter className="mt-4">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => onSetIsCreatePacienteModalOpen(false)}
//             >
//               Cancelar
//             </Button>
//             <Button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-600"
//               disabled={isSubmitting}
//             >
//               <Plus className="size-4 mr-1" />
//               Criar Paciente
//             </Button>
//           </DialogFooter>
//         </form>
//       </Form>
//     </DialogContent>
//   )
// }

// export default CreatePacienteModal
