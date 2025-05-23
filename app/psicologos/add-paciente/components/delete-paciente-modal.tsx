// 'use client'
// import { Dispatch, SetStateAction, useState } from 'react'
// import { useQuery, useQueryClient } from '@tanstack/react-query'
// import { Trash2 } from 'lucide-react'

// import { toast } from 'sonner'
// import { api } from '@/lib/axios'

// import {
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from '@/components/ui/dialog'
// import { Button } from '@/components/ui/button'

// type IdeletePacienteModalProps = {
//   id: number | null
//   isOpen: boolean
//   onSetIsDeletePacienteModalOpen: Dispatch<SetStateAction<boolean>>
// }

// type Ipaciente = {
//   name: string
// }

// const DeletePacieneModal = ({
//   id,
//   isOpen,
//   onSetIsDeletePacienteModalOpen,
// }: IdeletePacienteModalProps) => {
//   const queryClient = useQueryClient()

//   const [isDeleting, setIsDeleting] = useState(false)

//   const { data: paciente } = useQuery<Ipaciente>({
//     queryKey: ['paciente', id],
//     queryFn: async (): Promise<Ipaciente> => {
//       const response = await api.get<Ipaciente>(`/create-paciente/${id}`)

//       return response.data
//     },
//     enabled: isOpen,
//   })

//   const handleDeletePaciente = async () => {
//     try {
//       setIsDeleting(true)

//       const response = await api.delete<{ message: string }>(`/create-paciente/${id}`)

//       const { message } = response.data

//       if (response.status !== 200) {
//         return toast.error('Erro', {
//           description: message,
//         })
//       }

//       toast.success('Sucesso', {
//         description: message,
//       })

//       queryClient.invalidateQueries({
//         queryKey: ['services'],
//       })

//       return onSetIsDeletePacienteModalOpen(false)
//     } catch (error) {
//       console.error('Error: ', error)
//       const errorMessage =
//         error instanceof Error ? error.message : 'Erro desconhecido'

//       toast.success('Erro ao excluir', {
//         description: errorMessage,
//       })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   return (
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle className="flex items-center text-red-600">
//           <Trash2 className="h-5 w-5 mr-2" />
//           Confirmar exclusão
//         </DialogTitle>
//         <DialogDescription>
//           Tem certeza que deseja excluir o servico{' '}
//           <span className="font-medium">{paciente?.name}</span>? Esta ação não
//           pode ser desfeita.
//         </DialogDescription>
//       </DialogHeader>
//       <DialogFooter className="mt-4">
//         <Button
//           variant="outline"
//           onClick={() => onSetIsDeletePacienteModalOpen(false)}
//         >
//           Cancelar
//         </Button>
//         <Button
//           variant="destructive"
//           onClick={handleDeletePaciente}
//           disabled={isDeleting}
//         >
//           {isDeleting ? 'Excluindo...' : 'Excluir'}
//         </Button>
//       </DialogFooter>
//     </DialogContent>
//   )
// }

// export default DeletePacieneModal