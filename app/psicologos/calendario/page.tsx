"use client"

import { useState } from "react"
import { Clock, TrendingUp, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import Calendar from "./components/calendar"
import { getDaysInMonth } from "date-fns"

type AppointmentType = "confirmed" | "blocked" | "pending" | "cancelled"

type Appointment = {
  id: number
  date: number
  time: string
  therapist: string
  type: AppointmentType
}

const appointments: Appointment[] = [
  { id: 1, date: 2, time: "09:00", therapist: "Maria Silva", type: "confirmed" },
  { id: 2, date: 2, time: "14:00", therapist: "Carlos Mendes", type: "confirmed" },
  { id: 3, date: 5, time: "10:30", therapist: "Fernanda Lima", type: "confirmed" },
  { id: 4, date: 8, time: "10:00", therapist: "Roberto Gomes", type: "confirmed" },
  { id: 5, date: 10, time: "15:00", therapist: "Juliana Costa", type: "confirmed" },
  { id: 6, date: 12, time: "11:30", therapist: "Carlos Mendes", type: "confirmed" },
  { id: 7, date: 15, time: "14:00", therapist: "Maria Silva", type: "confirmed" },
  { id: 8, date: 16, time: "16:30", therapist: "João Santos", type: "confirmed" },
  { id: 9, date: 19, time: "13:30", therapist: "Fernanda Lima", type: "confirmed" },
  { id: 10, date: 20, time: "16:00", therapist: "Reunião", type: "blocked" },
  { id: 11, date: 21, time: "09:00", therapist: "Ana Oliveira", type: "pending" },
  { id: 12, date: 21, time: "11:30", therapist: "Carlos Mendes", type: "confirmed" },
  { id: 13, date: 22, time: "10:00", therapist: "Roberto Gomes", type: "confirmed" },
  { id: 14, date: 22, time: "14:00", therapist: "Maria Silva", type: "confirmed" },
  { id: 15, date: 23, time: "15:00", therapist: "Juliana Costa", type: "confirmed" },
  { id: 16, date: 23, time: "16:30", therapist: "João Santos", type: "confirmed" },
]

const upcomingAppointments = [
  { time: "Hoje, 13:30", name: "Fernanda Lima", type: "Terapia Individual", status: "confirmed" },
  { time: "Hoje, 16:00", name: "Reunião", type: "Bloqueio", status: "blocked" },
  { time: "Amanhã, 09:00", name: "Ana Oliveira", type: "Terapia Individual", status: "pending" },
  { time: "Amanhã, 11:30", name: "Carlos Mendes", type: "Avaliação Psicológica", status: "confirmed" },
  { time: "22/05, 10:00", name: "Roberto Gomes", type: "Terapia Individual", status: "confirmed" },
  { time: "22/05, 14:00", name: "Maria Silva", type: "Terapia Individual", status: "confirmed" },
]

const monthStats = {
  totalSessions: 24,
  confirmed: 20,
  pending: 3,
  cancelled: 1,
  occupancyRate: 85,
}

export default function MindFlowCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 19)) // May 19, 2025
  const [viewMode, setViewMode] = useState<"Dia" | "Semana" | "Mês">("Mês")

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Previous month days
    const prevMonth = new Date(year, month - 1, 0)
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isToday: false,
      })
    }

    // Current month days
    const today = new Date()
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate()
      days.push({
        day,
        isCurrentMonth: true,
        isToday,
      })
    }

    // Next month days to fill the grid
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isToday: false,
      })
    }

    return days
  }

  const getAppointmentsForDay = (day: number) => {
    return appointments.filter((apt) => apt.date === day)
  }

  const getStatusColor = (type: string) => {
    switch (type) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200"
      case "blocked":
        return "bg-gray-100 text-gray-700 border-gray-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusDot = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-500"
      case "pending":
        return "bg-amber-500"
      case "cancelled":
        return "bg-red-500"
      case "blocked":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const days = getDaysInMonth(currentDate)

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header with Breadcrumbs */}
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
                <BreadcrumbPage className="text-gray-800">Agenda</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
          <div className="p-6">
            <div className="flex gap-6">
              {/* Main Calendar Component */}
              <Calendar
                currentDate={currentDate}
                navigateMonth={navigateMonth}
                viewMode={viewMode}
                setViewMode={setViewMode}
                daysOfWeek={daysOfWeek}
                days={days}
                getAppointmentsForDay={getAppointmentsForDay}
                getStatusColor={getStatusColor}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
function setCurrentDate(newDate: Date) {
  throw new Error("Function not implemented.")
}

