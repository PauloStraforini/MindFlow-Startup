"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar"
import { Badge } from "@/src/components/ui/badge"
import { Progress } from "@/src/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Users, Calendar, FileText, Clock, User, BellRing, ArrowUpRight, MoreHorizontal, ChevronRight, Brain, Activity, Heart } from 'lucide-react'

const chartData = [
  { mes: "Jan 24", total: 12 },
  { mes: "Feb 24", total: 18 },
  { mes: "Mar 24", total: 21 },
  { mes: "Apr 24", total: 23 },
  { mes: "May 24", total: 25 },
  { mes: "Jun 24", total: 27 },
  { mes: "Jul 24", total: 30 },
]

export default function DashboardPsicologia() {
  return (
    <div className="w-full space-y-8">
      {/* Cards lado a lado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden border border-slate-300 shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl text-slate-800 font-semibold">Evolução de Atendimentos</CardTitle>
                <CardDescription className="text-slate-500">Análise de crescimento nos últimos 7 dias</CardDescription>
              </div>
              <Tabs defaultValue="semana" className="w-[240px]">
                <TabsList className="grid w-full grid-cols-3 bg-slate-100">
                  <TabsTrigger value="semana" className="data-[state=active]:bg-white data-[state=active]:text-emerald-600">Semana</TabsTrigger>
                  <TabsTrigger value="mes" className="data-[state=active]:bg-white data-[state=active]:text-emerald-600">Mês</TabsTrigger>
                  <TabsTrigger value="ano" className="data-[state=active]:bg-white data-[state=active]:text-emerald-600">Ano</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center mb-6 bg-slate-50 p-3 rounded-lg">
              <div className="text-3xl font-bold mr-3 text-slate-800">30</div>
              <div className="flex items-center text-sm text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-md">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>+5.84% nos últimos 7 dias</span>
              </div>
              <div className="ml-auto">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 0, right: 10, left: 10, bottom: 20 }}>
                <XAxis 
                  dataKey="mes" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#6b7280", fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#6b7280", fontSize: 12 }} 
                  tickFormatter={(value) => `${value}`}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    padding: "12px",
                  }}
                  itemStyle={{ color: "#10b981", fontWeight: 500 }}
                  labelStyle={{ color: "#1f2937", fontWeight: 600, marginBottom: "8px" }}
                  cursor={{ fill: "rgba(16, 185, 129, 0.1)" }}
                />
                <Bar 
                  dataKey="total" 
                  fill="#10b981" 
                  radius={[6, 6, 0, 0]} 
                  barSize={40}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter className="pt-0 pb-4 px-6">
            <Button variant="outline" size="sm" className="text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-800">
              Ver relatório completo
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden border border-slate-300 shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl text-slate-800 font-semibold flex items-center gap-2">
                  <BellRing className="h-5 w-5 text-indigo-500" />
                  Lembretes
                </CardTitle>
                <CardDescription className="text-slate-500">Tarefas pendentes para hoje</CardDescription>
              </div>
              <Badge className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200">3 pendentes</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {[
                { texto: "Finalizar relatório da paciente Maria", prioridade: "alta" },
                { texto: "Preparar material para sessão em grupo", prioridade: "média" },
                { texto: "Responder e-mails de encaminhamento", prioridade: "baixa" }
              ].map((lembrete, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div 
                    className={`w-3 h-3 rounded-full mt-1.5 ${
                      lembrete.prioridade === "alta" ? "bg-red-500" : 
                      lembrete.prioridade === "média" ? "bg-amber-500" : "bg-blue-500"
                    }`} 
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">{lembrete.texto}</p>
                    <div className="flex items-center mt-2 justify-between">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          lembrete.prioridade === "alta" ? "border-red-200 text-red-600" : 
                          lembrete.prioridade === "média" ? "border-amber-200 text-amber-600" : 
                          "border-blue-200 text-blue-600"
                        }`}
                      >
                        {lembrete.prioridade === "alta" ? "Urgente" : 
                         lembrete.prioridade === "média" ? "Importante" : "Normal"}
                      </Badge>
                      <span className="text-xs text-slate-400">Hoje</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-5">
            <Button 
              variant="outline" 
              className="w-full text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 transition-colors" 
              size="sm"
            >
              <BellRing className="h-4 w-4 mr-2" />
              Adicionar  novos lembrete
            </Button>
          </CardFooter>
        </Card>
      </div> 
    </div>
  )
}
