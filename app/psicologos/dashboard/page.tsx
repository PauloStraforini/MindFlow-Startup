import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  FileText,
  Users,
  TrendingUp,
  BrainCircuit,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import StatsCard from "@/app/psicologos/dashboard/components/stats-card";
import PatientsForMonth from "./components/patients-for-month";
import { PatientOverview } from "./components/patient-overview";

export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/psicologos/login");
  }

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
  ];

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
      color:
        "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/50",
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
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-pink-100 dark:border-pink-800 px-4 bg-white dark:bg-pink-950/50">
          <SidebarTrigger className="-ml-1 text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400" />
          <Separator
            orientation="vertical"
            className="mr-2 h-4 bg-pink-200 dark:bg-pink-700"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href="#"
                  className="text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block text-pink-300 dark:text-pink-600" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-800 dark:text-gray-200">
                  Visão Geral
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 bg-gradient-to-b from-slate-50 to-pink-50 dark:from-pink-950 dark:to-pink-900 min-h-screen">
          <StatsCard />
          <PatientsForMonth />
          <PatientOverview/>

        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
