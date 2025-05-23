// "use client"
// import { useState, useEffect } from "react"
// import { MoreHorizontal, Edit, Trash2, RefreshCw, Users, FileText, Plus, Search, Filter } from "lucide-react"

// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// import { Dialog, DialogTrigger } from "@/components/ui/dialog"

// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// import { Button } from "@/components/ui/button"
// import { Separator } from "@/components/ui/separator"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { AppSidebar } from "@/components/ui/app-sidebar"
// import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"

// import EditPacienteModal from "./components/edit-paciente-modal"
// import DeletePacienteModal from "./components/delete-paciente-modal"
// import CreatePacienteModal from "./components/create-paciente-modal"
// import { useQuery, useQueryClient } from "@tanstack/react-query"
// import { api } from "@/lib/axios"

// type Ipaciente = {
//   id: number
//   nome: string
//   cpf: string
//   email: string
//   telefone?: string
//   dataNascimento: string
//   endereco?: string
//   createdAt: string
// }

// export default function AddPacientePage() {
//   const queryClient = useQueryClient()

//   const {
//     data: paciente,
//     isLoading,
//     error,
//   } = useQuery<Ipaciente[]>({
//     queryKey: ["add-paciente"],
//     queryFn: async (): Promise<Ipaciente[]> => {
//       const response = await api.get<Ipaciente[]>("/psicologos/add-paciente")
//       return response.data
//     },
//   })

//   const [isEditPacienteModalOpen, setIsEditPacienteModalOpen] = useState(false)
//   const [isDeletePacienteModalOpen, setIsDeletePacienteModalOpen] = useState(false)
//   const [isCreatePacienteModalOpen, setIsCreatePacienteModalOpen] = useState(false)

//   const [currentPacienteId, setCurrentPacienteId] = useState<number | null>(null)

//   const handleOpenEditPacienteModal = (PacienteId: number) => {
//     setCurrentPacienteId(PacienteId)
//     setIsEditPacienteModalOpen(true)
//   }

//   const handleOpenDeletePacienteModal = (PacienteId: number) => {
//     setCurrentPacienteId(PacienteId)
//     setIsDeletePacienteModalOpen(true)
//   }

//   const loadPacientes = async () => {
//     try {
//       queryClient.invalidateQueries({
//         queryKey: ["pacientes"],
//       })
//     } catch (error) {
//       console.error("Error: ", error)
//     }
//   }

//   useEffect(() => {
//     loadPacientes()
//   }, [])

//   const handleResetFilters = () => {
//     loadPacientes()
//   }

//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <SidebarInset>
//         <header className="flex h-16 shrink-0 items-center gap-2 border-b border-pink-100 dark:border-pink-800 px-4 bg-white dark:bg-pink-950/50">
//           <SidebarTrigger className="-ml-1 text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400" />
//           <Separator orientation="vertical" className="mr-2 h-4 bg-pink-200 dark:bg-pink-700" />
//           <Breadcrumb>
//             <BreadcrumbList>
//               <BreadcrumbItem className="hidden md:block">
//                 <BreadcrumbLink
//                   href="/psicologos/dashboard"
//                   className="text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300"
//                 >
//                   Dashboard
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator className="hidden md:block text-pink-300 dark:text-pink-600" />
//               <BreadcrumbItem>
//                 <BreadcrumbPage className="text-gray-800 dark:text-gray-200">Gerenciamento de Pacientes</BreadcrumbPage>
//               </BreadcrumbItem>
//             </BreadcrumbList>
//           </Breadcrumb>
//         </header>

//         <div className="flex flex-1 flex-col gap-4 p-4 bg-gradient-to-b from-slate-50 to-pink-50 dark:from-pink-950 dark:to-pink-900 min-h-screen">
//           <Card className="shadow-md border-pink-100 dark:border-pink-800 overflow-hidden bg-white dark:bg-pink-900/50">
//             <CardHeader className="pb-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white">
//               <CardTitle className="text-2xl font-medium">Gerenciamento de Pacientes</CardTitle>
//               <CardDescription className="text-pink-50">
//                 Visualize, adicione, edite e remova pacientes do sistema
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="p-0">
//               <Tabs value={"list"} className="w-full">
//                 <div className="border-b border-pink-100 dark:border-pink-800 px-6 bg-white dark:bg-pink-950/50">
//                   <TabsList className="bg-transparent h-12">
//                     <TabsTrigger
//                       value="list"
//                       className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pink-500 data-[state=active]:text-pink-700 dark:data-[state=active]:text-pink-300 data-[state=active]:shadow-none rounded-none h-12 text-gray-600 dark:text-gray-400"
//                     >
//                       <FileText className="size-4 mr-2" />
//                       Lista de Pacientes
//                     </TabsTrigger>
//                   </TabsList>
//                 </div>

//                 <TabsContent value="list" className="p-6 pt-4">
//                   <div className="mb-6">
//                     <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
//                       <div className="flex items-center">
//                         <h3 className="text-lg font-medium text-pink-800 dark:text-pink-200">Pacientes cadastrados</h3>
//                         <Badge
//                           variant="outline"
//                           className="ml-3 bg-pink-50 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-700"
//                         >
//                           {Array.isArray(paciente) ? paciente.length : 0} itens
//                         </Badge>
//                       </div>

//                       <div className="flex flex-col sm:flex-row gap-3">
//                         <div className="relative">
//                           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                           <Input
//                             placeholder="Buscar paciente..."
//                             className="pl-9 w-full sm:w-64 border-pink-200 dark:border-pink-700 focus-visible:ring-pink-500"
//                           />
//                         </div>
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           className="border-pink-200 dark:border-pink-700 text-pink-700 dark:text-pink-300 hover:bg-pink-50 dark:hover:bg-pink-800/50"
//                         >
//                           <Filter className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   </div>

//                   <Separator className="my-6 bg-pink-100 dark:bg-pink-800" />

//                   {isLoading ? (
//                     <div className="flex justify-center py-12">
//                       <div className="flex flex-col items-center">
//                         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mb-4"></div>
//                         <p className="text-pink-700 dark:text-pink-300">Carregando todos os Pacientes...</p>
//                       </div>
//                     </div>
//                   ) : error ? (
//                     <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg text-center">
//                       <div className="text-red-500 dark:text-red-400 mb-4 text-lg font-medium">{error.message}</div>
//                       <Button
//                         variant="outline"
//                         onClick={() => loadPacientes()}
//                         className="border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
//                       >
//                         <RefreshCw className="mr-2 h-4 w-4" />
//                         Tentar novamente
//                       </Button>
//                     </div>
//                   ) : (
//                     <div className="rounded-md border border-pink-100 dark:border-pink-800 overflow-hidden">
//                       <Table>
//                         <TableHeader className="bg-pink-50 dark:bg-pink-900/50">
//                           <TableRow className="hover:bg-pink-50/80 dark:hover:bg-pink-800/50">
//                             <TableHead className="font-semibold text-pink-900 dark:text-pink-100 w-32">CPF</TableHead>
//                             <TableHead className="font-semibold text-pink-900 dark:text-pink-100 w-48">Nome</TableHead>
//                             <TableHead className="font-semibold text-pink-900 dark:text-pink-100 w-48">
//                               Data de Nascimento
//                             </TableHead>
//                             <TableHead className="font-semibold text-pink-900 dark:text-pink-100 w-48">Email</TableHead>
//                             <TableHead className="font-semibold text-center w-24 text-pink-900 dark:text-pink-100">
//                               Telefone
//                             </TableHead>
//                             <TableHead className="font-semibold text-center w-48 text-pink-900 dark:text-pink-100">
//                               Endereço
//                             </TableHead>

//                             <TableHead className="font-semibold text-center w-24 text-pink-900 dark:text-pink-100">
//                               Ações
//                             </TableHead>
//                             <TableHead className="font-medium w-10">
//                               <Dialog open={isCreatePacienteModalOpen} onOpenChange={setIsCreatePacienteModalOpen}>
//                                 <DialogTrigger asChild>
//                                   <Button
//                                     variant="secondary"
//                                     type="button"
//                                     size="icon"
//                                     className="cursor-pointer bg-pink-500 hover:bg-pink-600 text-white"
//                                   >
//                                     <Plus />
//                                   </Button>
//                                 </DialogTrigger>

//                                 <CreatePacienteModal
//                                   isOpen={isCreatePacienteModalOpen}
//                                   onSetIsCreatePacienteModalOpen={setIsCreatePacienteModalOpen}
//                                 />
//                               </Dialog>
//                             </TableHead>
//                           </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                           {/* Verifique se "paciente" é um array e não está vazio */}
//                           {Array.isArray(paciente) && paciente.length > 0 ? (
//                             paciente.map(({ id, nome, cpf, dataNascimento, endereco, email, telefone }) => (
//                               <TableRow
//                                 key={id}
//                                 className="hover:bg-pink-50/50 dark:hover:bg-pink-800/30 transition-colors border-b border-pink-100 dark:border-pink-800"
//                               >
//                                 <TableCell className="py-4 text-sm font-medium text-pink-900 dark:text-pink-100">
//                                   {cpf}
//                                 </TableCell>
//                                 <TableCell className="py-4 text-sm font-medium text-pink-900 dark:text-pink-100">
//                                   {nome}
//                                 </TableCell>
//                                 <TableCell className="py-4 text-sm font-medium text-pink-900 dark:text-pink-100">
//                                   {new Date(dataNascimento).toLocaleDateString("pt-BR")}
//                                 </TableCell>
//                                 <TableCell className="py-4 text-sm font-medium text-pink-900 dark:text-pink-100">
//                                   {email}
//                                 </TableCell>
//                                 <TableCell className="py-4 text-sm font-medium text-pink-900 dark:text-pink-100">
//                                   {telefone}
//                                 </TableCell>
//                                 <TableCell className="py-4 text-sm font-medium text-pink-900 dark:text-pink-100">
//                                   {endereco}
//                                 </TableCell>

//                                 <TableCell className="text-center py-4">
//                                   <DropdownMenu>
//                                     <DropdownMenuTrigger asChild>
//                                       <Button
//                                         variant="ghost"
//                                         size="icon"
//                                         className="h-8 w-8 hover:bg-pink-100 dark:hover:bg-pink-800 hover:text-pink-700 dark:hover:text-pink-300"
//                                       >
//                                         <MoreHorizontal className="h-4 w-4 text-pink-600 dark:text-pink-400" />
//                                         <span className="sr-only">Abrir menu</span>
//                                       </Button>
//                                     </DropdownMenuTrigger>
//                                     <DropdownMenuContent align="end" className="border-pink-100 dark:border-pink-800">
//                                       <DropdownMenuItem
//                                         onClick={() => handleOpenEditPacienteModal(id)}
//                                         className="hover:bg-pink-50 dark:hover:bg-pink-800/50 hover:text-pink-700 dark:hover:text-pink-300 cursor-pointer"
//                                       >
//                                         <Edit className="mr-2 size-4" />
//                                         Editar
//                                       </DropdownMenuItem>
//                                       <DropdownMenuItem
//                                         onClick={() => handleOpenDeletePacienteModal(id)}
//                                         className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 cursor-pointer"
//                                       >
//                                         <Trash2 className="mr-2 size-4" />
//                                         Excluir
//                                       </DropdownMenuItem>
//                                     </DropdownMenuContent>
//                                   </DropdownMenu>
//                                 </TableCell>
//                               </TableRow>
//                             ))
//                           ) : (
//                             <TableRow>
//                               <TableCell colSpan={7} className="text-center py-16 text-pink-700 dark:text-pink-300">
//                                 <div className="flex flex-col items-center">
//                                   <Users className="h-12 w-12 text-pink-300 dark:text-pink-600 mb-3" />
//                                   <p className="text-lg font-medium mb-1">Nenhum paciente encontrado</p>
//                                   <p className="text-sm text-pink-600 dark:text-pink-400 mb-4">
//                                     Adicione um novo paciente ou ajuste os filtros
//                                   </p>
//                                   <Button
//                                     variant="outline"
//                                     onClick={() => {
//                                       handleResetFilters()
//                                       loadPacientes()
//                                     }}
//                                     className="mt-2 border-pink-200 dark:border-pink-700 text-pink-700 dark:text-pink-300 hover:bg-pink-50 dark:hover:bg-pink-800/50"
//                                   >
//                                     <RefreshCw className="mr-2 h-4 w-4" />
//                                     Limpar filtros e tentar novamente
//                                   </Button>
//                                 </div>
//                               </TableCell>
//                             </TableRow>
//                           )}
//                         </TableBody>
//                       </Table>
//                     </div>
//                   )}
//                 </TabsContent>
//               </Tabs>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Edit Dialog */}
//         <Dialog open={isEditPacienteModalOpen} onOpenChange={setIsEditPacienteModalOpen}>
//           <EditPacienteModal
//             id={currentPacienteId}
//             isOpen={isEditPacienteModalOpen}
//             onSetIsEditPacienteModalOpen={setIsEditPacienteModalOpen}
//           />
//         </Dialog>

//         {/* Delete Confirmation Dialog */}
//         <Dialog open={isDeletePacienteModalOpen} onOpenChange={setIsDeletePacienteModalOpen}>
//           <DeletePacienteModal
//             id={currentPacienteId}
//             isOpen={isDeletePacienteModalOpen}
//             onSetIsDeletePacienteModalOpen={setIsDeletePacienteModalOpen}
//           />
//         </Dialog>
//       </SidebarInset>
//     </SidebarProvider>
//   )
// }
