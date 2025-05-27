"use client"
import { useState, useEffect } from "react"
import { MoreHorizontal, Edit, Trash2, RefreshCw, Users, FileText, Plus, Search, Filter, UserPlus } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import EditPacienteModal from "./components/edit-paciente-modal"
import DeletePacienteModal from "./components/delete-paciente-modal"
import CreatePacienteModal from "./components/create-paciente-modal"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/axios"

type Ipaciente = {
  id: number
  nome: string
  cpf: string
  email: string
  telefone?: string
  dataNascimento: string
  endereco?: string
  createdAt: string
}

export default function AddPacientePage() {
  const queryClient = useQueryClient()

  const {
    data: paciente,
    isLoading,
    error,
  } = useQuery<Ipaciente[]>({
    queryKey: ["add-paciente"],
    queryFn: async (): Promise<Ipaciente[]> => {
      const response = await api.get<Ipaciente[]>("/psicologos/add-paciente")
      return response.data
    },
  })

  const [isEditPacienteModalOpen, setIsEditPacienteModalOpen] = useState(false)
  const [isDeletePacienteModalOpen, setIsDeletePacienteModalOpen] = useState(false)
  const [isCreatePacienteModalOpen, setIsCreatePacienteModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const [currentPacienteId, setCurrentPacienteId] = useState<number | null>(null)

  const handleOpenEditPacienteModal = (PacienteId: number) => {
    setCurrentPacienteId(PacienteId)
    setIsEditPacienteModalOpen(true)
  }

  const handleOpenDeletePacienteModal = (PacienteId: number) => {
    setCurrentPacienteId(PacienteId)
    setIsDeletePacienteModalOpen(true)
  }

  const loadPacientes = async () => {
    try {
      queryClient.invalidateQueries({
        queryKey: ["pacientes"],
      })
    } catch (error) {
      console.error("Error: ", error)
    }
  }

  useEffect(() => {
    loadPacientes()
  }, [])

  const handleResetFilters = () => {
    setSearchTerm("")
    loadPacientes()
  }

  // Filter patients based on search term
  const filteredPacientes = Array.isArray(paciente)
    ? paciente.filter(
        (p) =>
          p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.cpf.includes(searchTerm) ||
          p.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : []

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-blue-200 dark:border-purple-800 px-6 bg-white dark:bg-purple-950">
          <SidebarTrigger className="-ml-1 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-blue-200 dark:bg-purple-700" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href="/psicologos/dashboard"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block text-blue-400 dark:text-purple-600" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sky-900 dark:text-blue-100 font-medium">
                  Gerenciamento de Pacientes
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 bg-gradient-to-br from-sky-50/50 via-white to-purple-50/50 dark:from-sky-950 dark:via-purple-900 dark:to-purple-950 min-h-screen">
          {/* Header Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-sky-900 dark:text-blue-100">Gerenciamento de Pacientes</h1>
                <p className="text-blue-600 dark:text-blue-400 mt-1">
                  Visualize, adicione, edite e remova pacientes do sistema
                </p>
              </div>
              <Dialog open={isCreatePacienteModalOpen} onOpenChange={setIsCreatePacienteModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Novo Paciente
                  </Button>
                </DialogTrigger>
                <CreatePacienteModal
                  isOpen={isCreatePacienteModalOpen}
                  onSetIsCreatePacienteModalOpen={setIsCreatePacienteModalOpen}
                />
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-blue-200 dark:border-purple-800 bg-white dark:bg-purple-950/50 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Total de Pacientes</p>
                      <p className="text-2xl font-bold text-sky-900 dark:text-blue-100">
                        {Array.isArray(paciente) ? paciente.length : 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 dark:border-purple-800 bg-white dark:bg-purple-950/50 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                      <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Ativos</p>
                      <p className="text-2xl font-bold text-sky-900 dark:text-blue-100">
                        {Array.isArray(paciente) ? paciente.length : 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 dark:border-purple-800 bg-white dark:bg-purple-950/50 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                      <Search className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Filtrados</p>
                      <p className="text-2xl font-bold text-sky-900 dark:text-blue-100">{filteredPacientes.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content Card */}
          <Card className="shadow-lg border-blue-200 dark:border-purple-800 overflow-hidden bg-white dark:bg-purple-950/50">
            <CardContent className="p-0">
              <Tabs value={"list"} className="w-full">
                <div className="border-b border-blue-200 dark:border-purple-800 px-6 py-4 bg-blue-50/50 dark:bg-purple-900/30">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <TabsList className="bg-white dark:bg-purple-900/50 border border-blue-200 dark:border-purple-700 p-1">
                      <TabsTrigger
                        value="list"
                        className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm text-blue-700 dark:text-blue-300"
                      >
                        <FileText className="size-4 mr-2" />
                        Lista de Pacientes
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500 dark:text-blue-400" />
                        <Input
                          placeholder="Buscar por nome, CPF ou email..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-full sm:w-80 border-blue-200 dark:border-purple-700 focus-visible:ring-blue-500 focus-visible:border-blue-500 bg-white dark:bg-purple-900/50"
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-blue-200 dark:border-purple-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-purple-800/50"
                      >
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <TabsContent value="list" className="p-6 pt-6">
                  {isLoading ? (
                    <div className="flex justify-center py-16">
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-blue-700 dark:text-blue-300 font-medium">Carregando pacientes...</p>
                      </div>
                    </div>
                  ) : error ? (
                    <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-xl text-center border border-red-200 dark:border-red-800">
                      <div className="text-red-600 dark:text-red-400 mb-4 text-lg font-medium">
                        Erro ao carregar pacientes
                      </div>
                      <p className="text-red-500 dark:text-red-400 mb-6">{error.message}</p>
                      <Button
                        variant="outline"
                        onClick={() => loadPacientes()}
                        className="border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Tentar novamente
                      </Button>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-blue-200 dark:border-purple-800 overflow-hidden bg-white dark:bg-purple-950/30">
                      <Table>
                        <TableHeader className="bg-blue-50 dark:bg-purple-900/50">
                          <TableRow className="hover:bg-blue-50/80 dark:hover:bg-purple-800/50 border-b border-blue-200 dark:border-purple-800">
                            <TableHead className="font-semibold text-sky-900 dark:text-blue-100 py-4">CPF</TableHead>
                            <TableHead className="font-semibold text-sky-900 dark:text-blue-100 py-4">Nome</TableHead>
                            <TableHead className="font-semibold text-sky-900 dark:text-blue-100 py-4">
                              Data de Nascimento
                            </TableHead>
                            <TableHead className="font-semibold text-sky-900 dark:text-blue-100 py-4">Email</TableHead>
                            <TableHead className="font-semibold text-sky-900 dark:text-blue-100 py-4">
                              Telefone
                            </TableHead>
                            <TableHead className="font-semibold text-sky-900 dark:text-blue-100 py-4">
                              Endereço
                            </TableHead>
                            <TableHead className="font-semibold text-center text-sky-900 dark:text-blue-100 py-4">
                              Ações
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredPacientes.length > 0 ? (
                            filteredPacientes.map(({ id, nome, cpf, dataNascimento, endereco, email, telefone }) => (
                              <TableRow
                                key={id}
                                className="hover:bg-blue-50/50 dark:hover:bg-purple-800/30 transition-colors border-b border-blue-100 dark:border-purple-800"
                              >
                                <TableCell className="py-4 text-sm font-medium text-sky-900 dark:text-blue-100">
                                  <Badge
                                    variant="outline"
                                    className="bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                                  >
                                    {cpf}
                                  </Badge>
                                </TableCell>
                                <TableCell className="py-4 text-sm font-medium text-sky-900 dark:text-blue-100">
                                  {nome}
                                </TableCell>
                                <TableCell className="py-4 text-sm text-blue-700 dark:text-blue-300">
                                  {new Date(dataNascimento).toLocaleDateString("pt-BR")}
                                </TableCell>
                                <TableCell className="py-4 text-sm text-blue-700 dark:text-blue-300">{email}</TableCell>
                                <TableCell className="py-4 text-sm text-blue-700 dark:text-blue-300">
                                  {telefone || "—"}
                                </TableCell>
                                <TableCell className="py-4 text-sm text-blue-700 dark:text-blue-300 max-w-xs truncate">
                                  {endereco || "—"}
                                </TableCell>
                                <TableCell className="text-center py-4">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-purple-800 hover:text-blue-700 dark:hover:text-blue-300 rounded-lg"
                                      >
                                        <MoreHorizontal className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        <span className="sr-only">Abrir menu</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                      align="end"
                                      className="border-blue-200 dark:border-purple-800 bg-white dark:bg-purple-950 shadow-lg"
                                    >
                                      <DropdownMenuItem
                                        onClick={() => handleOpenEditPacienteModal(id)}
                                        className="hover:bg-blue-50 dark:hover:bg-purple-800/50 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer"
                                      >
                                        <Edit className="mr-2 size-4" />
                                        Editar
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => handleOpenDeletePacienteModal(id)}
                                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 cursor-pointer"
                                      >
                                        <Trash2 className="mr-2 size-4" />
                                        Excluir
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-16">
                                <div className="flex flex-col items-center">
                                  <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-4">
                                    <Users className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                                  </div>
                                  <h3 className="text-lg font-semibold text-sky-900 dark:text-blue-100 mb-2">
                                    {searchTerm ? "Nenhum paciente encontrado" : "Nenhum paciente cadastrado"}
                                  </h3>
                                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-6 max-w-md">
                                    {searchTerm
                                      ? "Tente ajustar os termos de busca ou limpar os filtros"
                                      : "Comece adicionando seu primeiro paciente ao sistema"}
                                  </p>
                                  <div className="flex gap-3">
                                    {searchTerm && (
                                      <Button
                                        variant="outline"
                                        onClick={handleResetFilters}
                                        className="border-blue-200 dark:border-purple-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-purple-800/50"
                                      >
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Limpar filtros
                                      </Button>
                                    )}
                                    <Button
                                      onClick={() => setIsCreatePacienteModalOpen(true)}
                                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                    >
                                      <Plus className="mr-2 h-4 w-4" />
                                      Adicionar Paciente
                                    </Button>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditPacienteModalOpen} onOpenChange={setIsEditPacienteModalOpen}>
          <EditPacienteModal
            id={currentPacienteId}
            isOpen={isEditPacienteModalOpen}
            onSetIsEditPacienteModalOpen={setIsEditPacienteModalOpen}
          />
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeletePacienteModalOpen} onOpenChange={setIsDeletePacienteModalOpen}>
          <DeletePacienteModal
            id={currentPacienteId}
            isOpen={isDeletePacienteModalOpen}
            onSetIsDeletePacienteModalOpen={setIsDeletePacienteModalOpen}
          />
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  )
}
