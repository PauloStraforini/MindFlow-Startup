"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Progress } from "@/src/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Users, FileText, TrendingUp, ChevronRight, PieChart } from "lucide-react"

export function PatientOverview() {
  const [activeTab, setActiveTab] = useState("todos")

  return (
    <Card className="bg-white dark:bg-zinc-900 border-pink-100 dark:border-pink-800/30 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="h-1 bg-gradient-to-r from-pink-500 to-pink-400"></div>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold text-pink-900 dark:text-pink-100 flex items-center gap-2">
              <Users className="h-5 w-5 text-pink-600 dark:text-pink-400" />
              Visão Geral dos Pacientes
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300 mt-1">
              Distribuição e estatísticas dos seus pacientes
            </CardDescription>
          </div>
          <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="grid w-full grid-cols-3 bg-pink-50 dark:bg-pink-950/30">
              <TabsTrigger
                value="todos"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-pink-900/50 data-[state=active]:text-pink-700 dark:data-[state=active]:text-pink-300"
              >
                Todos
              </TabsTrigger>
              <TabsTrigger
                value="ativos"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-pink-900/50 data-[state=active]:text-pink-700 dark:data-[state=active]:text-pink-300"
              >
                Ativos
              </TabsTrigger>
              <TabsTrigger
                value="novos"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-pink-900/50 data-[state=active]:text-pink-700 dark:data-[state=active]:text-pink-300"
              >
                Novos
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gráfico de Idade/Gênero */}
          <div className="col-span-2 rounded-xl border border-pink-100 dark:border-pink-800/30 bg-gradient-to-br from-pink-50 to-white dark:from-pink-950/30 dark:to-zinc-900 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-pink-900 dark:text-pink-100">Distribuição Demográfica</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-pink-600 dark:text-pink-400 hover:text-pink-700 hover:bg-pink-50 dark:hover:bg-pink-950/50"
              >
                <PieChart className="h-4 w-4 mr-1" />
                Alternar visualização
              </Button>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-zinc-800/50 p-8 rounded-lg shadow-sm w-full max-w-md">
                <FileText className="h-12 w-12 mx-auto mb-3 text-pink-300 dark:text-pink-700" />
                <p className="mb-4">Gráfico de distribuição de pacientes por idade e gênero</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-pink-200 dark:border-pink-800 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-950/50"
                >
                  Gerar gráfico
                </Button>
              </div>
            </div>
          </div>

          {/* Estatísticas Laterais */}
          <div className="space-y-5">
            <InfoCard
              title="Faixa Etária"
              value="18-35 anos"
              percent="65%"
              icon={<Users className="h-4 w-4 text-pink-500 dark:text-pink-400" />}
            />
            <InfoCard
              title="Gênero"
              value="Feminino"
              percent="58%"
              icon={<Users className="h-4 w-4 text-pink-500 dark:text-pink-400" />}
            />
            <InfoCard
              title="Novos Pacientes"
              value="5 pacientes"
              percent="+12%"
              percentColor="text-emerald-600 dark:text-emerald-400"
              icon={<TrendingUp className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-pink-100 dark:border-pink-900/30 pt-4 flex justify-between items-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Última atualização: <span className="font-medium">Hoje, 14:30</span>
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="text-pink-600 dark:text-pink-400 hover:text-pink-700 hover:bg-pink-50 dark:hover:bg-pink-950/50"
        >
          Ver relatório completo
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  )
}

function InfoCard({
  title,
  value,
  percent,
  percentColor = "text-pink-600 dark:text-pink-400",
  icon,
}: {
  title: string
  value: string
  percent: string
  percentColor?: string
  icon?: React.ReactNode
}) {
  // Extract numeric value from percent string for progress bar
  const progressValue = Number.parseInt(percent.replace(/[^0-9]/g, ""))

  return (
    <div className="p-5 rounded-xl border border-pink-100 dark:border-pink-800/30 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon && <span className="group-hover:scale-110 transition-transform duration-300">{icon}</span>}
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</span>
        </div>
        <span
          className={`text-sm font-semibold ${percentColor} bg-opacity-10 px-2 py-0.5 rounded-full text-xs ${percentColor.includes("pink") ? "bg-pink-100 dark:bg-pink-900/30" : "bg-emerald-100 dark:bg-emerald-900/30"}`}
        >
          {percent}
        </span>
      </div>
      <div className="mt-2 mb-3">
        <span className="text-lg font-bold text-pink-900 dark:text-pink-100 group-hover:text-pink-700 dark:group-hover:text-pink-300 transition-colors">
          {value}
        </span>
      </div>
      <Progress
        value={progressValue}
        className={`h-1.5 bg-pink-100 dark:bg-pink-950/50 ${
          percentColor.includes("pink")
            ? "progress-indicator-pink"
            : "progress-indicator-emerald"
        }`}
      />
    </div>
  )
}
