"use client"
import { useState, useEffect } from "react"
import {
  MoreHorizontal,
  Edit,
  Trash2,
  RefreshCw,
  FileText,
  Plus,
  Search,
  Filter,
  Eye,
  Download,
  User,
  Clock,
} from "lucide-react"

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

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/axios"

type IProntuario = {
  id: number
  pacienteId: number
  pacienteNome: string
  titulo: string
  descricao: string
  dataConsulta: string
  tipoConsulta: "inicial" | "retorno" | "emergencia"
  status: "ativo" | "arquivado" | "pendente"
  observacoes?: string
  createdAt: string
  updatedAt: string
}

export default function ProntuariosPage() {
  const queryClient = useQueryClient()

  const {
    data: prontuarios,
    isLoading,
    error,
  } = useQuery<IProntuario[]>({
    queryKey: ["prontuarios"],
    queryFn: async (): Promise<IProntuario[]> => {
      const response = await api.get<IProntuario[]>("/psicologos/prontuarios")
      return response.data
    },
  })

  const [isCreateProntuarioModalOpen, setIsCreateProntuarioModalOpen] = useState(false)
  const [isEditProntuarioModalOpen, setIsEditProntuarioModalOpen] = useState(false)
  const [isDeleteProntuarioModalOpen, setIsDeleteProntuarioModalOpen] = useState(false)
  const [isViewProntuarioModalOpen, setIsViewProntuarioModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const [currentProntuarioId, setCurrentProntuarioId] = useState<number | null>(null)

  const handleOpenEditProntuarioModal = (prontuarioId: number) => {
    setCurrentProntuarioId(prontuarioId)
    setIsEditProntuarioModalOpen(true)
  }

  const handleOpenDeleteProntuarioModal = (prontuarioId: number) => {
    setCurrentProntuarioId(prontuarioId)
    setIsDeleteProntuarioModalOpen(true)
  }

  const handleOpenViewProntuarioModal = (prontuarioId: number) => {
    setCurrentProntuarioId(prontuarioId)
    setIsViewProntuarioModalOpen(true)
  }

  const loadProntuarios = async () => {
    try {
      queryClient.invalidateQueries({
        queryKey: ["prontuarios"],
      })
    } catch (error) {
      console.error("Error: ", error)
    }
  }

  useEffect(() => {
    loadProntuarios()
  }, [])

  const handleResetFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    loadProntuarios()
  }

  // Filter prontuarios based on search term and status
  const filteredProntuarios = Array.isArray(prontuarios)
    ? prontuarios.filter((p) => {
        const matchesSearch =
          p.pacienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.descricao.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || p.status === statusFilter

        return matchesSearch && matchesStatus
      })
    : []

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Ativo</Badge>
      case "arquivado":
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Arquivado</Badge>
      case "pendente":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Pendente</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTipoConsultaBadge = (tipo: string) => {
    switch (tipo) {
      case "inicial":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Inicial</Badge>
      case "retorno":
        return <Badge className="bg-purple-100 text-purple-700 border-purple-200">Retorno</Badge>
      case "emergencia":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Emergência</Badge>
      default:
        return <Badge variant="outline">{tipo}</Badge>
    }
  }

  const statusCounts = {
    total: filteredProntuarios.length,
    ativo: filteredProntuarios.filter((p) => p.status === "ativo").length,
    pendente: filteredProntuarios.filter((p) => p.status === "pendente").length,
    arquivado: filteredProntuarios.filter((p) => p.status === "arquivado").length,
  }

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
                <BreadcrumbPage className="text-sky-900 dark:text-blue-100 font-medium">Prontuários</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 bg-gradient-to-br from-sky-50/50 via-white to-purple-50/50 dark:from-sky-950 dark:via-purple-900 dark:to-purple-950 min-h-screen">
          {/* Header Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-sky-900 dark:text-blue-100">Prontuários</h1>
                <p className="text-blue-600 dark:text-blue-400 mt-1">
                  Gerencie e visualize todos os prontuários dos seus pacientes
                </p>
              </div>
              <Dialog open={isCreateProntuarioModalOpen} onOpenChange={setIsCreateProntuarioModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Prontuário
                  </Button>
                </DialogTrigger>
                {/* CreateProntuarioModal component would go here */}
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-blue-200 dark:border-purple-800 bg-white dark:bg-purple-950/50 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Total</p>
                      <p className="text-2xl font-bold text-sky-900 dark:text-blue-100">{statusCounts.total}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 dark:border-purple-800 bg-white dark:bg-purple-950/50 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                      <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Ativos</p>
                      <p className="text-2xl font-bold text-sky-900 dark:text-blue-100">{statusCounts.ativo}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 dark:border-purple-800 bg-white dark:bg-purple-950/50 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
                      <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Pendentes</p>
                      <p className="text-2xl font-bold text-sky-900 dark:text-blue-100">{statusCounts.pendente}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 dark:border-purple-800 bg-white dark:bg-purple-950/50 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-900/50 rounded-lg">
                      <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Arquivados</p>
                      <p className="text-2xl font-bold text-sky-900 dark:text-blue-100">{statusCounts.arquivado}</p>
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
                        Lista de Prontuários
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500 dark:text-blue-400" />
                        <Input
                          placeholder="Buscar por paciente, título ou descrição..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-full sm:w-80 border-blue-200 dark:border-purple-700 focus-visible:ring-blue-500 focus-visible:border-blue-500 bg-white dark:bg-purple-900/50"
                        />
                      </div>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-blue-200 dark:border-purple-700 rounded-md bg-white dark:bg-purple-900/50 text-blue-700 dark:text-blue-300 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="all">Todos os Status</option>
                        <option value="ativo">Ativo</option>
                        <option value="pendente">Pendente</option>
                        <option value="arquivado">Arquivado</option>
                      </select>
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
                        <p className="text-blue-700 dark:text-blue-300 font-medium">Carregando prontuários...</p>
                      </div>
                    </div>
                  ) : error ? (
                    <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-xl text-center border border-red-200 dark:border-red-800">
                      <div className="text-red-600 dark:text-red-400 mb-4 text-lg font-medium">
                        Erro ao carregar prontuários
                      </div>
                      <p className="text-red-500 dark:text-red-400 mb-6">{error.message}</p>
                      <Button
                        variant="outline"
                        onClick={() => loadProntuarios()}
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
                            <TableHead className="font-semibold text-sky-900 dark:text-blue-100 py-4">
                              Paciente
                            </TableHead>
                            <TableHead className="font-semibold text-sky-900 dark:text-blue-100 py-4">Título</TableHead>
                            <TableHead className="font-semibold text-sky-900 dark:text-blue-100 py-4">
                              Data da Consulta
                            </TableHead>
                            <TableHead className="font-semibold text-sky-900 dark:text-blue-100 py-4">Tipo</TableHead>
                            <TableHead className="font-semibold text-sky-900 dark:text-blue-100 py-4">Status</TableHead>
                            <TableHead className="font-semibold text-sky-900 dark:text-blue-100 py-4">
                              Última Atualização
                            </TableHead>
                            <TableHead className="font-semibold text-center text-sky-900 dark:text-blue-100 py-4">
                              Ações
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredProntuarios.length > 0 ? (
                            filteredProntuarios.map(
                              ({ id, pacienteNome, titulo, dataConsulta, tipoConsulta, status, updatedAt }) => (
                                <TableRow
                                  key={id}
                                  className="hover:bg-blue-50/50 dark:hover:bg-purple-800/30 transition-colors border-b border-blue-100 dark:border-purple-800"
                                >
                                  <TableCell className="py-4 text-sm font-medium text-sky-900 dark:text-blue-100">
                                    {pacienteNome}
                                  </TableCell>
                                  <TableCell className="py-4 text-sm font-medium text-sky-900 dark:text-blue-100 max-w-xs truncate">
                                    {titulo}
                                  </TableCell>
                                  <TableCell className="py-4 text-sm text-blue-700 dark:text-blue-300">
                                    {new Date(dataConsulta).toLocaleDateString("pt-BR")}
                                  </TableCell>
                                  <TableCell className="py-4">{getTipoConsultaBadge(tipoConsulta)}</TableCell>
                                  <TableCell className="py-4">{getStatusBadge(status)}</TableCell>
                                  <TableCell className="py-4 text-sm text-blue-700 dark:text-blue-300">
                                    {new Date(updatedAt).toLocaleDateString("pt-BR")}
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
                                          onClick={() => handleOpenViewProntuarioModal(id)}
                                          className="hover:bg-blue-50 dark:hover:bg-purple-800/50 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer"
                                        >
                                          <Eye className="mr-2 size-4" />
                                          Visualizar
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => handleOpenEditProntuarioModal(id)}
                                          className="hover:bg-blue-50 dark:hover:bg-purple-800/50 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer"
                                        >
                                          <Edit className="mr-2 size-4" />
                                          Editar
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="hover:bg-blue-50 dark:hover:bg-purple-800/50 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer">
                                          <Download className="mr-2 size-4" />
                                          Exportar PDF
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => handleOpenDeleteProntuarioModal(id)}
                                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 cursor-pointer"
                                        >
                                          <Trash2 className="mr-2 size-4" />
                                          Excluir
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              ),
                            )
                          ) : (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-16">
                                <div className="flex flex-col items-center">
                                  <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-4">
                                    <FileText className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                                  </div>
                                  <h3 className="text-lg font-semibold text-sky-900 dark:text-blue-100 mb-2">
                                    {searchTerm || statusFilter !== "all"
                                      ? "Nenhum prontuário encontrado"
                                      : "Nenhum prontuário cadastrado"}
                                  </h3>
                                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-6 max-w-md">
                                    {searchTerm || statusFilter !== "all"
                                      ? "Tente ajustar os termos de busca ou filtros"
                                      : "Comece criando seu primeiro prontuário"}
                                  </p>
                                  <div className="flex gap-3">
                                    {(searchTerm || statusFilter !== "all") && (
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
                                      onClick={() => setIsCreateProntuarioModalOpen(true)}
                                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                    >
                                      <Plus className="mr-2 h-4 w-4" />
                                      Criar Prontuário
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

        {/* Modals would go here */}
        {/* View Dialog */}
        {/* Edit Dialog */}
        {/* Delete Confirmation Dialog */}
      </SidebarInset>
    </SidebarProvider>
  )
}
