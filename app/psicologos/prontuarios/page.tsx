"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Plus,
  FileText,
  Calendar,
  User,
  Clock,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Download,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const prontuarios = [
  {
    id: 1,
    paciente: "Maria Silva Santos",
    cpf: "123.456.789-00",
    idade: 28,
    terapeuta: "Dr. Carlos Mendes",
    dataUltimaSessao: "2025-01-20",
    proximaSessao: "2025-01-27",
    totalSessoes: 12,
    status: "ativo",
    diagnostico: "Transtorno de Ansiedade",
    observacoes: "Paciente apresenta melhora significativa nos últimos meses.",
    telefone: "(11) 99999-9999",
    email: "maria.silva@email.com",
  },
  {
    id: 2,
    paciente: "João Pedro Oliveira",
    cpf: "987.654.321-00",
    idade: 35,
    terapeuta: "Dra. Ana Oliveira",
    dataUltimaSessao: "2025-01-18",
    proximaSessao: "2025-01-25",
    totalSessoes: 8,
    status: "ativo",
    diagnostico: "Depressão Moderada",
    observacoes: "Paciente em processo de adaptação ao tratamento.",
    telefone: "(11) 88888-8888",
    email: "joao.pedro@email.com",
  },
  {
    id: 3,
    paciente: "Fernanda Lima Costa",
    cpf: "456.789.123-00",
    idade: 42,
    terapeuta: "Dr. Roberto Gomes",
    dataUltimaSessao: "2025-01-15",
    proximaSessao: null,
    totalSessoes: 24,
    status: "concluido",
    diagnostico: "Transtorno do Pânico",
    observacoes: "Tratamento concluído com sucesso. Alta médica.",
    telefone: "(11) 77777-7777",
    email: "fernanda.lima@email.com",
  },
  {
    id: 4,
    paciente: "Roberto Santos Silva",
    cpf: "321.654.987-00",
    idade: 29,
    terapeuta: "Dra. Juliana Costa",
    dataUltimaSessao: "2025-01-22",
    proximaSessao: "2025-01-29",
    totalSessoes: 6,
    status: "ativo",
    diagnostico: "Transtorno Bipolar",
    observacoes: "Paciente iniciou tratamento recentemente.",
    telefone: "(11) 66666-6666",
    email: "roberto.santos@email.com",
  },
  {
    id: 5,
    paciente: "Ana Carolina Ferreira",
    cpf: "789.123.456-00",
    idade: 31,
    terapeuta: "Dr. Carlos Mendes",
    dataUltimaSessao: "2025-01-10",
    proximaSessao: null,
    totalSessoes: 3,
    status: "pausado",
    diagnostico: "Estresse Pós-Traumático",
    observacoes: "Tratamento pausado a pedido da paciente.",
    telefone: "(11) 55555-5555",
    email: "ana.carolina@email.com",
  },
]

const estatisticas = {
  totalProntuarios: 5,
  ativos: 3,
  concluidos: 1,
  pausados: 1,
  novosEsteMes: 2,
}

export default function ProntuariosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [terapeutaFilter, setTerapeutaFilter] = useState("todos")
  const [selectedProntuario, setSelectedProntuario] = useState<any>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "concluido":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "pausado":
        return "bg-amber-100 text-amber-700 border-amber-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ativo":
        return "Ativo"
      case "concluido":
        return "Concluído"
      case "pausado":
        return "Pausado"
      default:
        return status
    }
  }

  const filteredProntuarios = prontuarios.filter((prontuario) => {
    const matchesSearch =
      prontuario.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prontuario.cpf.includes(searchTerm) ||
      prontuario.terapeuta.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "todos" || prontuario.status === statusFilter
    const matchesTerapeuta = terapeutaFilter === "todos" || prontuario.terapeuta === terapeutaFilter

    return matchesSearch && matchesStatus && matchesTerapeuta
  })

  const terapeutas = [...new Set(prontuarios.map((p) => p.terapeuta))]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-pink-100 px-4 bg-white/80 backdrop-blur-sm">
          <SidebarTrigger className="-ml-1 text-gray-600 hover:text-pink-600" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-pink-200" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard" className="text-pink-600 hover:text-pink-800">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block text-pink-300" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-800">Prontuários</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
          <div className="p-6">
            {/* Header da página */}
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-6 mb-6 shadow-lg">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h1 className="text-3xl font-bold">Prontuários Médicos</h1>
                  <p className="text-pink-100 text-sm mt-1">Gerencie os prontuários dos seus pacientes</p>
                </div>
                <div className="flex gap-3">
                  <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    <Upload className="w-4 h-4 mr-2" />
                    Importar
                  </Button>
                  <Button className="bg-white text-pink-600 hover:bg-white/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Prontuário
                  </Button>
                </div>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-2xl font-bold text-gray-800">{estatisticas.totalProntuarios}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Ativos</p>
                      <p className="text-2xl font-bold text-gray-800">{estatisticas.ativos}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Concluídos</p>
                      <p className="text-2xl font-bold text-gray-800">{estatisticas.concluidos}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Pausados</p>
                      <p className="text-2xl font-bold text-gray-800">{estatisticas.pausados}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Plus className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Novos</p>
                      <p className="text-2xl font-bold text-gray-800">{estatisticas.novosEsteMes}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filtros e busca */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar por paciente, CPF ou terapeuta..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 border-pink-200 focus-visible:ring-pink-500"
                      />
                    </div>
                  </div>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48 border-pink-200">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Status</SelectItem>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="concluido">Concluído</SelectItem>
                      <SelectItem value="pausado">Pausado</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={terapeutaFilter} onValueChange={setTerapeutaFilter}>
                    <SelectTrigger className="w-full md:w-48 border-pink-200">
                      <SelectValue placeholder="Terapeuta" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Terapeutas</SelectItem>
                      {terapeutas.map((terapeuta) => (
                        <SelectItem key={terapeuta} value={terapeuta}>
                          {terapeuta}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Lista de prontuários */}
            <div className="grid gap-4">
              {filteredProntuarios.map((prontuario) => (
                <Card
                  key={prontuario.id}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                          {prontuario.paciente
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .substring(0, 2)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{prontuario.paciente}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>CPF: {prontuario.cpf}</span>
                            <span>•</span>
                            <span>{prontuario.idade} anos</span>
                            <span>•</span>
                            <span>{prontuario.terapeuta}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge className={`${getStatusColor(prontuario.status)} border`}>
                            {getStatusLabel(prontuario.status)}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">{prontuario.totalSessoes} sessões</p>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-pink-50">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedProntuario(prontuario)}>
                              <Eye className="w-4 h-4 mr-2" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Exportar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Diagnóstico:</p>
                        <p className="font-medium text-gray-800">{prontuario.diagnostico}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Última Sessão:</p>
                        <p className="font-medium text-gray-800">
                          {prontuario.dataUltimaSessao
                            ? new Date(prontuario.dataUltimaSessao).toLocaleDateString("pt-BR")
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Próxima Sessão:</p>
                        <p className="font-medium text-gray-800">
                          {prontuario.proximaSessao
                            ? new Date(prontuario.proximaSessao).toLocaleDateString("pt-BR")
                            : "Não agendada"}
                        </p>
                      </div>
                    </div>

                    {prontuario.observacoes && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Observações:</p>
                        <p className="text-sm text-gray-800 mt-1">{prontuario.observacoes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProntuarios.length === 0 && (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Nenhum prontuário encontrado</h3>
                  <p className="text-gray-500 mb-4">Não há prontuários que correspondam aos filtros aplicados.</p>
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Novo Prontuário
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Modal de detalhes do prontuário */}
        {selectedProntuario && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
              <CardHeader className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Prontuário - {selectedProntuario.paciente}</CardTitle>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedProntuario(null)}
                    className="text-white hover:bg-white/20"
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="dados" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="dados">Dados Pessoais</TabsTrigger>
                    <TabsTrigger value="clinico">Dados Clínicos</TabsTrigger>
                    <TabsTrigger value="sessoes">Sessões</TabsTrigger>
                    <TabsTrigger value="documentos">Documentos</TabsTrigger>
                  </TabsList>

                  <TabsContent value="dados" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Informações Básicas</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm text-gray-600">Nome Completo</label>
                            <p className="font-medium">{selectedProntuario.paciente}</p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-600">CPF</label>
                            <p className="font-medium">{selectedProntuario.cpf}</p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-600">Idade</label>
                            <p className="font-medium">{selectedProntuario.idade} anos</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Contato</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm text-gray-600">Telefone</label>
                            <p className="font-medium">{selectedProntuario.telefone}</p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-600">E-mail</label>
                            <p className="font-medium">{selectedProntuario.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="clinico" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Informações Clínicas</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="text-sm text-gray-600">Diagnóstico</label>
                            <p className="font-medium">{selectedProntuario.diagnostico}</p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-600">Terapeuta Responsável</label>
                            <p className="font-medium">{selectedProntuario.terapeuta}</p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-600">Status do Tratamento</label>
                            <Badge className={`${getStatusColor(selectedProntuario.status)} border`}>
                              {getStatusLabel(selectedProntuario.status)}
                            </Badge>
                          </div>
                          <div>
                            <label className="text-sm text-gray-600">Total de Sessões</label>
                            <p className="font-medium">{selectedProntuario.totalSessoes}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-gray-600">Observações</label>
                        <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                          <p className="text-gray-800">{selectedProntuario.observacoes}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="sessoes" className="mt-6">
                    <div className="text-center py-12 text-gray-500">
                      <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <h4 className="text-lg font-semibold mb-2">Histórico de Sessões</h4>
                      <p>Em desenvolvimento...</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="documentos" className="mt-6">
                    <div className="text-center py-12 text-gray-500">
                      <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <h4 className="text-lg font-semibold mb-2">Documentos</h4>
                      <p>Em desenvolvimento...</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  )
}
