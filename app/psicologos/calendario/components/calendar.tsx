"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Appointment {
  id: number
  date: number
  time: string
  therapist: string
  type: "confirmed" | "pending" | "cancelled" | "blocked"
}

interface DayInfo {
  day: number
  isCurrentMonth: boolean
  isToday: boolean
}

interface CalendarProps {
  currentDate: Date
  navigateMonth: (direction: "prev" | "next") => void
  viewMode: "Dia" | "Semana" | "Mês"
  setViewMode: (mode: "Dia" | "Semana" | "Mês") => void
  daysOfWeek: string[]
  days: DayInfo[]
  getAppointmentsForDay: (day: number) => Appointment[]
  getStatusColor: (type: string) => string
}

export default function Calendar({
  currentDate,
  navigateMonth,
  viewMode,
  setViewMode,
  daysOfWeek,
  days,
  getAppointmentsForDay,
  getStatusColor,
}: CalendarProps) {
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl p-4 mb-4 shadow-lg">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth("prev")}
            className="hover:bg-white/20 rounded-full transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h1>
            <p className="text-pink-100 text-sm">Visualize seus agendamentos</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth("next")}
            className="hover:bg-white/20 rounded-full transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex gap-1 bg-white/20 rounded-lg p-1">
          {(["Dia", "Semana", "Mês"] as const).map((mode) => (
            <Button
              key={mode}
              size="sm"
              variant={viewMode === mode ? "secondary" : "ghost"}
              className={`transition-all duration-200 ${viewMode === mode ? "bg-white text-pink-600 shadow-sm font-medium" : "text-white hover:bg-white/20"}`}
              onClick={() => setViewMode(mode)}
            >
              {mode}
            </Button>
          ))}
        </div>
      </div>

      {/* Views */}
      {viewMode === "Mês" && (
        <Card className="shadow-xl bg-white/90 backdrop-blur-sm border-0 overflow-hidden">
          <CardContent className="p-0">
            {/* Header dos dias da semana */}
            <div className="grid grid-cols-7 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center text-sm font-semibold p-3 text-gray-700 border-r last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            {/* Grid do calendário */}
            <div className="grid grid-cols-7">
              {days.map((d, idx) => (
                <div
                  key={idx}
                  className={`min-h-[100px] p-2 border-r border-b last:border-r-0 transition-all duration-200 hover:bg-gray-50/80 ${
                    !d.isCurrentMonth ? "bg-gray-50/50 text-gray-400" : "bg-white"
                  } ${d.isToday ? "bg-pink-50 ring-2 ring-pink-200" : ""}`}
                >
                  <div
                    className={`text-sm font-semibold mb-2 ${
                      d.isToday
                        ? "bg-pink-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs"
                        : "text-gray-700"
                    }`}
                  >
                    {d.day}
                  </div>

                  {/* Appointments */}
                  <div className="space-y-1">
                    {d.isCurrentMonth &&
                      getAppointmentsForDay(d.day)
                        .slice(0, 3)
                        .map((apt) => (
                          <div
                            key={apt.id}
                            className={`text-xs rounded-md p-1.5 transition-all duration-200 hover:scale-105 cursor-pointer ${getStatusColor(apt.type)}`}
                            title={`${apt.time} - ${apt.therapist}`}
                          >
                            <div className="font-medium truncate">{apt.time}</div>
                            <div className="text-xs opacity-80 truncate">{apt.therapist}</div>
                          </div>
                        ))}

                    {/* Indicador de mais appointments */}
                    {d.isCurrentMonth && getAppointmentsForDay(d.day).length > 3 && (
                      <div className="text-xs text-gray-500 font-medium px-1.5 py-1 bg-gray-100 rounded-md">
                        +{getAppointmentsForDay(d.day).length - 3} mais
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Views em desenvolvimento */}
      {viewMode === "Semana" && (
        <Card className="shadow-xl bg-white/90 backdrop-blur-sm border-0">
          <CardContent className="p-8 text-center">
            <div className="text-gray-500">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChevronRight className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Visualização Semanal</h3>
              <p className="text-sm">Em desenvolvimento...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {viewMode === "Dia" && (
        <Card className="shadow-xl bg-white/90 backdrop-blur-sm border-0">
          <CardContent className="p-8 text-center">
            <div className="text-gray-500">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChevronRight className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Visualização Diária</h3>
              <p className="text-sm">Em desenvolvimento...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
