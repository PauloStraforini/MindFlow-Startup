import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, FileText, Users, CheckCircle2, AlertCircle, MoreHorizontal } from "lucide-react"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Image from "next/image"

import Psy from "@/components/images/figurePsy.png"

export default async function DoctorHeader() {
    const session = await auth()
    if (!session) {
        redirect("/psicologos/login")
    }

    // Sample data for the dashboard
    const stats = [
        {
            title: "Pacientes Ativos",
            value: "32",
            change: "+2 este mês",
            icon: Users,
            color: "text-white",
            bgColor: "bg-pink-600 dark:bg-pink-700",
        },
        {
            title: "Sessões Agendadas",
            value: "12",
            change: "Próximos 7 dias",
            icon: Calendar,
            color: "text-white",
            bgColor: "bg-cyan-600 dark:bg-cyan-700",
        },
        {
            title: "Relatórios Pendentes",
            value: "5",
            change: "3 com prazo próximo",
            icon: FileText,
            color: "text-white",
            bgColor: "bg-indigo-600 dark:bg-indigo-700",
        },
        {
            title: "Horas Trabalhadas",
            value: "24h",
            change: "Esta semana",
            icon: Clock,
            color: "text-white",
            bgColor: "bg-purple-600 dark:bg-purple-700",
        },
    ]

    const upcomingAppointments = [
        {
            patient: "Maria Silva",
            time: "Hoje, 14:00",
            type: "Terapia Individual",
            status: "confirmado",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            patient: "João Santos",
            time: "Hoje, 16:30",
            type: "Primeira Consulta",
            status: "confirmado",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            patient: "Ana Oliveira",
            time: "Amanhã, 09:00",
            type: "Terapia Individual",
            status: "pendente",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            patient: "Carlos Mendes",
            time: "Amanhã, 11:30",
            type: "Avaliação Psicológica",
            status: "confirmado",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            patient: "Juliana Costa",
            time: "Quinta, 15:00",
            type: "Terapia Individual",
            status: "confirmado",
            avatar: "/placeholder.svg?height=40&width=40",
        },
    ]

    const recentActivities = [
        {
            type: "Prontuário Atualizado",
            patient: "Maria Silva",
            time: "Há 2 horas",
            icon: FileText,
            color: "text-pink-600 bg-pink-100 dark:text-pink-400 dark:bg-pink-900/50",
        },
        {
            type: "Sessão Concluída",
            patient: "Pedro Almeida",
            time: "Há 4 horas",
            icon: CheckCircle2,
            color: "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/50",
        },
        {
            type: "Novo Agendamento",
            patient: "Fernanda Lima",
            time: "Há 1 dia",
            icon: Calendar,
            color: "text-pink-600 bg-pink-100 dark:text-pink-400 dark:bg-pink-900/50",
        },
        {
            type: "Alerta de Paciente",
            patient: "Roberto Gomes",
            time: "Há 1 dia",
            icon: AlertCircle,
            color: "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/50",
        },
    ]

    const currentDate = new Date()
    const formattedDate = new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(currentDate)

    return (
        <div>
            {/* Blue Header Banner */}
            <div className="relative bg-blue-600 text-white overflow-hidden h-[220px] border-4 border-white rounded-xl">
                <div className="absolute inset-0 overflow-hidden">

                    {/* Floating medical icons with better positioning */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-10 right-32 animate-pulse">
                            <FileText className="size-10 text-slate-800" />
                        </div>
                        <div className="absolute top-20 right-64 animate-pulse delay-300">
                            <Calendar className="size-10 text-slate-800" />
                        </div>
                        <div className="absolute top-14 right-96 animate-pulse delay-700">
                            <Users className="size-10 text-slate-800" />
                        </div>
                        <div className="absolute top-28 right-80 animate-pulse">
                            <Clock className="size-10 text-slate-800" />
                        </div>
                        <div className="absolute top-6 left-24 animate-pulse delay-500">
                            <CheckCircle2 className="size-10 text-slate-800" />
                        </div>
                        <div className="absolute bottom-10 left-40 animate-pulse delay-200">
                            <AlertCircle className="size-10 text-slate-800" />
                        </div>
                        <div className="absolute bottom-16 right-20 animate-pulse delay-400">
                            <FileText className="size-10 text-slate-800" />
                        </div>
                        <div className="absolute bottom-6 right-60 animate-pulse delay-600">
                            <Users className="size-10 text-slate-800" />
                        </div>
                        {/* Mais ícones flutuantes */}
                        <div className="absolute top-4 left-1/2 animate-pulse delay-800">
                            <Calendar className="size-10 text-slate-800" />
                        </div>
                        <div className="absolute bottom-4 left-1/3 animate-pulse delay-1000">
                            <Clock className="size-10 text-slate-800" />
                        </div>
                        <div className="absolute top-1/2 right-10 animate-pulse delay-900">
                            <CheckCircle2 className="size-10 text-slate-800" />
                        </div>
                        <div className="absolute bottom-2 right-1/4 animate-pulse delay-1100">
                            <AlertCircle className="size-10 text-slate-800" />
                        </div>
                    </div>

                    {/* Doctor illustration - better positioned */}
                    <div className="absolute right-24 top-0 h-full flex items-center justify-end">
                        <Image
                            src={Psy || "/placeholder.svg"}
                            alt="Doctor illustration"
                            width={220}
                            height={200}
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-center pl-10">
                    <div className="flex items-center gap-4 mb-2">
                        <Avatar className="h-14 w-14 border-2 border-white shadow-lg">
                            <AvatarImage src={session?.user?.image || "/placeholder.svg"} alt={session?.user?.name || "Usuário"} />
                            <AvatarFallback className="bg-pink-200 text-pink-700 text-xl">
                                {session?.user?.name
                                    ? session.user.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")
                                    : "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl font-bold text-white drop-shadow">
                                Bem-vindo ao MindFlow,
                                    {session?.user?.name ? session.user.name : "Usuário"}
                            </CardTitle>
                            <p className="text-sm text-blue-100 mt-1">
                                Tenha um ótimo dia de trabalho! Aqui estão seus dados mais recentes.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                        <span className="bg-white/20 rounded-md px-3 py-1 text-xs flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formattedDate}
                        </span>
                        <span className="bg-white/20 rounded-md px-3 py-1 text-xs flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {stats[0].value} pacientes ativos
                        </span>
                    </div>

                </div>
            </div>


            <div className="flex-1 bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                    <Card className="bg-gradient-to-br from-pink-600 to-pink-700 text-white border-none shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-pink-100">Pacientes Ativos</p>
                                    <h3 className="text-3xl font-bold mt-2">32</h3>
                                    <p className="text-xs mt-1 text-pink-100">+2 este mês</p>
                                </div>
                                <div className="bg-pink-500/30 p-3 rounded-full">
                                    <Users className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="h-2 bg-pink-500/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-white w-3/4 rounded-full"></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-cyan-600 to-cyan-700 text-white border-none shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-cyan-100">Sessões Agendadas</p>
                                    <h3 className="text-3xl font-bold mt-2">12</h3>
                                    <p className="text-xs mt-1 text-cyan-100">Próximos 7 dias</p>
                                </div>
                                <div className="bg-cyan-500/30 p-3 rounded-full">
                                    <Calendar className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="h-2 bg-cyan-500/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-white w-1/2 rounded-full"></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-none shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-indigo-100">Relatórios Pendentes</p>
                                    <h3 className="text-3xl font-bold mt-2">5</h3>
                                    <p className="text-xs mt-1 text-indigo-100">3 com prazo próximo</p>
                                </div>
                                <div className="bg-indigo-500/30 p-3 rounded-full">
                                    <FileText className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="h-2 bg-indigo-500/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-white w-1/3 rounded-full"></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white border-none shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-purple-100">Horas Trabalhadas</p>
                                    <h3 className="text-3xl font-bold mt-2">24h</h3>
                                    <p className="text-xs mt-1 text-purple-100">Esta semana</p>
                                </div>
                                <div className="bg-purple-500/30 p-3 rounded-full">
                                    <Clock className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="h-2 bg-purple-500/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-white w-2/3 rounded-full"></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>               
            </div>
        </div>
    )
}
