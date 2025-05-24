"use client"

import { useState } from "react"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  CreditCard,
  PieChart,
  BarChart3,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock data
const resumoFinanceiro = {
  receitaTotal: 45750.0,
  receitaMes: 12500.0,
  crescimentoMensal: 8.5,
  sessoesPagas: 89,
  sessoesTotal: 95,
  ticketMedio: 140.45,
  inadimplencia: 5.2,
}

const dadosMensais = [
  { mes: "Jan", receita: 8500, sessoes: 65, inadimplencia: 3.2 },
  { mes: "Fev", receita: 9200, sessoes: 70, inadimplencia: 4.1 },
  { mes: "Mar", receita: 10100, sessoes: 75, inadimplencia: 2.8 },
  { mes: "Abr", receita: 11200, sessoes: 82, inadimplencia: 6.1 },
  { mes: "Mai", receita: 12500, sessoes: 89, inadimplencia: 5.2 },
]

const terapeutas = [
  {
    id: 1,
    nome: "Dr. Carlos Mendes",
    receitaMes: 4200.0,
    sessoes: 28,
    valorSessao: 150.0,
    crescimento: 12.5,
    pacientesAtivos: 15,
  },
  {
    id: 2,
    nome: "Dra. Ana Oliveira",
    receitaMes: 3800.0,
    sessoes: 25,
    valorSessao: 152.0,
    crescimento: -2.1,
    pacientesAtivos: 12,
  },
  {
    id: 3,
    nome: "Dr. Roberto Gomes",
    receitaMes: 2900.0,
    sessoes: 20,
    valorSessao: 145.0,
    crescimento: 5.8,
    pacientesAtivos: 10,
  },
  {
    id: 4,
    nome: "Dra. Juliana Costa",
    receitaMes: 1600.0,
    sessoes: 12,
    valorSessao: 133.33,
    crescimento: 18.2,
    pacientesAtivos: 8,
  },
]

const pagamentos = [
  {
    id: 1,
    paciente: "Maria Silva Santos",
    terapeuta: "Dr. Carlos Mendes",
    valor: 150.0,
    data: "2025-01-22",
    status: "pago",
    metodo: "PIX",
    sessao: "Terapia Individual",
  },
  {
    id: 2,
    paciente: "João Pedro Oliveira",
    terapeuta: "Dra. Ana Oliveira",
    valor: 152.0,
    data: "2025-01-21",
    status: "pendente",
    metodo: "Cartão",
    sessao: "Avaliação Psicológica",
  },
  {
    id: 3,
    paciente: "Fernanda Lima Costa",
    terapeuta: "Dr. Roberto Gomes",
    valor: 145.0,
    data: "2025-01-20",
    status: "pago",
    metodo: "Transferência",
    sessao: "Terapia Individual",
  },
  {
    id: 4,
    paciente: "Roberto Santos Silva",
    terapeuta: "Dra. Juliana Costa",
    valor: 133.33,
    data: "2025-01-19",
    status: "atrasado",
    metodo: "Boleto",
    sessao: "Terapia de Casal",
  },
  {
    id: 5,
    paciente: "Ana Carolina Ferreira",
    terapeuta: "Dr. Carlos Mendes",
    valor: 150.0,
    data: "2025-01-18",
    status: "pago",
    metodo: "PIX",
    sessao: "Terapia Individual",
  },
]

const metodosPagemento = [
  { metodo: "PIX", valor: 6750.0, porcentagem: 54 },
  { metodo: "Cartão de Crédito", valor: 3125.0, porcentagem: 25 },
  { metodo: "Transferência", valor: 1875.0, porcentagem: 15 },
  { metodo: "Boleto", valor: 750.0, porcentagem: 6 },
]

export default function RelatoriosPage() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState("mes-atual")
  const [terapeutaSelecionado, setTerapeutaSelecionado] = useState("todos")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pago":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "pendente":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "atrasado":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pago":
        return <CheckCircle className="w-4 h-4" />
      case "pendente":
        return <Clock className="w-4 h-4" />
      case "atrasado":
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`
  }

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
                <BreadcrumbPage className="text-gray-800">Relatórios Financeiros</BreadcrumbPage>
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
                  <h1 className="text-3xl font-bold">Relatórios Financeiros</h1>
                  <p className="text-pink-100 text-sm mt-1">Acompanhe o desempenho financeiro da sua clínica</p>
                </div>
                <div className="flex gap-3">
                  <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
                    <SelectTrigger className="w-48 bg-white/20 border-white/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mes-atual">Mês Atual</SelectItem>
                      <SelectItem value="ultimo-mes">Último Mês</SelectItem>
                      <SelectItem value="trimestre">Último Trimestre</SelectItem>
                      <SelectItem value="semestre">Último Semestre</SelectItem>
                      <SelectItem value="ano">Ano Atual</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
            </div>

            {/* Resumo Financeiro */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Receita Total</p>
                      <p className="text-2xl font-bold text-gray-800">
                        {formatCurrency(resumoFinanceiro.receitaTotal)}
                      </p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
                        <span className="text-sm text-emerald-600">
                          {formatPercentage(resumoFinanceiro.crescimentoMensal)}
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Receita do Mês</p>
                      <p className="text-2xl font-bold text-gray-800">{formatCurrency(resumoFinanceiro.receitaMes)}</p>
                      <div className="flex items-center mt-2">
                        <Calendar className="w-4 h-4 text-blue-500 mr-1" />
                        <span className="text-sm text-blue-600">{resumoFinanceiro.sessoesPagas} sessões</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Ticket Médio</p>
                      <p className="text-2xl font-bold text-gray-800">{formatCurrency(resumoFinanceiro.ticketMedio)}</p>
                      <div className="flex items-center mt-2">
                        <Users className="w-4 h-4 text-purple-500 mr-1" />
                        <span className="text-sm text-purple-600">Por sessão</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <PieChart className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Inadimplência</p>
                      <p className="text-2xl font-bold text-gray-800">{resumoFinanceiro.inadimplencia}%</p>
                      <div className="flex items-center mt-2">
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                        <span className="text-sm text-red-600">-1.2% vs mês anterior</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="visao-geral" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm">
                <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
                <TabsTrigger value="terapeutas">Por Terapeuta</TabsTrigger>
                <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
                <TabsTrigger value="metodos">Métodos</TabsTrigger>
                <TabsTrigger value="tendencias">Tendências</TabsTrigger>
              </TabsList>

              {/* Visão Geral */}
              <TabsContent value="visao-geral" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Gráfico de Receita Mensal */}
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-pink-600" />
                        Receita Mensal
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {dadosMensais.map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">{item.mes}</span>
                            <div className="flex items-center gap-4">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full"
                                  style={{ width: `${(item.receita / 12500) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-bold text-gray-800 w-20 text-right">
                                {formatCurrency(item.receita)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Distribuição por Status */}
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-pink-600" />
                        Status dos Pagamentos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">Pagos</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-gray-800">78%</p>
                            <p className="text-xs text-gray-500">{formatCurrency(9750)}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">Pendentes</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-gray-800">17%</p>
                            <p className="text-xs text-gray-500">{formatCurrency(2125)}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">Atrasados</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-gray-800">5%</p>
                            <p className="text-xs text-gray-500">{formatCurrency(625)}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Por Terapeuta */}
              <TabsContent value="terapeutas" className="space-y-6">
                <div className="grid gap-4">
                  {terapeutas.map((terapeuta) => (
                    <Card key={terapeuta.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                              {terapeuta.nome
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .substring(0, 2)}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">{terapeuta.nome}</h3>
                              <p className="text-sm text-gray-600">{terapeuta.pacientesAtivos} pacientes ativos</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Receita do Mês</p>
                              <p className="text-xl font-bold text-gray-800">{formatCurrency(terapeuta.receitaMes)}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Sessões</p>
                              <p className="text-xl font-bold text-gray-800">{terapeuta.sessoes}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Valor/Sessão</p>
                              <p className="text-xl font-bold text-gray-800">{formatCurrency(terapeuta.valorSessao)}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Crescimento</p>
                              <div className="flex items-center gap-1">
                                {terapeuta.crescimento > 0 ? (
                                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                                ) : (
                                  <TrendingDown className="w-4 h-4 text-red-500" />
                                )}
                                <span
                                  className={`text-sm font-medium ${
                                    terapeuta.crescimento > 0 ? "text-emerald-600" : "text-red-600"
                                  }`}
                                >
                                  {formatPercentage(terapeuta.crescimento)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Pagamentos */}
              <TabsContent value="pagamentos" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-pink-600" />
                      Últimos Pagamentos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pagamentos.map((pagamento) => (
                        <div
                          key={pagamento.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(pagamento.status)}
                              <Badge className={`${getStatusColor(pagamento.status)} border`}>{pagamento.status}</Badge>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{pagamento.paciente}</p>
                              <p className="text-sm text-gray-600">{pagamento.terapeuta}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Sessão</p>
                              <p className="text-sm font-medium text-gray-800">{pagamento.sessao}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Método</p>
                              <p className="text-sm font-medium text-gray-800">{pagamento.metodo}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Data</p>
                              <p className="text-sm font-medium text-gray-800">
                                {new Date(pagamento.data).toLocaleDateString("pt-BR")}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-800">{formatCurrency(pagamento.valor)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Métodos de Pagamento */}
              <TabsContent value="metodos" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-pink-600" />
                      Métodos de Pagamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {metodosPagemento.map((metodo, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">{metodo.metodo}</span>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-600">{metodo.porcentagem}%</span>
                              <span className="text-sm font-bold text-gray-800">{formatCurrency(metodo.valor)}</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full"
                              style={{ width: `${metodo.porcentagem}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tendências */}
              <TabsContent value="tendencias" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-pink-600" />
                        Crescimento Mensal
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {dadosMensais.map((item, index) => {
                          const crescimento =
                            index > 0
                              ? ((item.receita - dadosMensais[index - 1].receita) / dadosMensais[index - 1].receita) *
                                100
                              : 0
                          return (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-600">{item.mes}</span>
                              <div className="flex items-center gap-2">
                                {crescimento > 0 ? (
                                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                                ) : crescimento < 0 ? (
                                  <TrendingDown className="w-4 h-4 text-red-500" />
                                ) : null}
                                <span
                                  className={`text-sm font-medium ${
                                    crescimento > 0
                                      ? "text-emerald-600"
                                      : crescimento < 0
                                        ? "text-red-600"
                                        : "text-gray-600"
                                  }`}
                                >
                                  {index > 0 ? formatPercentage(crescimento) : "—"}
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-pink-600" />
                        Sessões vs Inadimplência
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {dadosMensais.map((item, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-600">{item.mes}</span>
                              <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-600">{item.sessoes} sessões</span>
                                <span className="text-sm font-bold text-red-600">{item.inadimplencia}%</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                                  style={{ width: `${(item.sessoes / 89) * 100}%` }}
                                ></div>
                              </div>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full"
                                  style={{ width: `${(item.inadimplencia / 10) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
