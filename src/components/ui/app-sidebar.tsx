"use client";

import { useState } from "react";
import type * as React from "react";
import {
  Brain,
  Calendar,
  FileText,
  Search,
  Video,
  BookOpen,
  Shield,
  CreditCard,
  PieChart,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarFooter,
} from "@/src/components/ui/sidebar";
import { Input } from "@/src/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/src/components/ui/collapsible";

import { SingOut } from "@/src/components/actions/singOut";


// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/psicologos/dashboard",
      icon: PieChart,
      isActive: true,
    },
    {
      title: "Pacientes",
      url: "",
      icon: FileText,
      items: [
        {
          title: "Cadastrar Paciente",
          url: "/psicologos/add-paciente",
          isActive: false,
        },
        {
          title: "Prontuários",
          url: "/psicologos/prontuarios",
          isActive: false,
        },
      ],
    },
    {
      title: "Agendamentos",
      url: "/agendamentos",
      icon: Calendar,
      items: [
        {
          title: "Calendário",
          url: "/psicologos/calendario",
          isActive: false,
        },
      ],
    },
    {
      title: "Pagamentos",
      url: "/psicologos",
      icon: CreditCard,
      items: [
        {
          title: "Relatórios Financeiros",
          url: "/psicologos/relatorio-financeiros",
          isActive: false,
        },
      ],
    },
    {
      title: "Videoconferência",
      url: "/videoconferencia",
      icon: Video,
    },
    {
      title: "Recursos",
      url: "/recursos",
      icon: BookOpen,
      items: [
        {
          title: "Biblioteca",
          url: "/recursos/biblioteca",
          isActive: false,
        },
        {
          title: "Exercícios",
          url: "/recursos/exercicios",
          isActive: false,
        },
        {
          title: "Materiais de Apoio",
          url: "/recursos/materiais",
          isActive: false,
        },
      ],
    },
    {
      title: "Relatórios",
      url: "/relatorios",
      icon: PieChart,
      items: [
        {
          title: "Desempenho",
          url: "/relatorios/desempenho",
          isActive: false,
        },
        {
          title: "Estatísticas",
          url: "/relatorios/estatisticas",
          isActive: false,
        },
        {
          title: "Exportar Dados",
          url: "/relatorios/exportar",
          isActive: false,
        },
      ],
    },
    {
      title: "Configurações",
      url: "/configuracoes",
      icon: Shield,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Track open/closed state for each menu item
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  // Toggle open/closed state for a specific menu item
  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <Sidebar className="border-r border-gray-200 bg-white" {...props}>
      <SidebarHeader className="border-b border-gray-100 bg-white p-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a
                href="#"
                className="flex items-center gap-3 hover:bg-transparent"
              >
                <div className="flex aspect-square size-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
                  <Brain className="size-6" />
                </div>
                <div className="flex flex-col gap-1 leading-none">
                  <span className="text-gray-900 font-bold text-xl">
                    MindFlow
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="mt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Pesquisar..."
              className="pl-10 h-11 bg-gray-50 border-gray-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 rounded-xl"
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6 bg-white">
        <SidebarGroup>
          <SidebarMenu className="space-y-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.items?.length ? (
                  <Collapsible
                    open={openItems[item.title]}
                    onOpenChange={() => toggleItem(item.title)}
                    className="w-full"
                  >
                    <CollapsibleTrigger className="w-full">
                      <div
                        className={`flex items-center w-full rounded-xl p-3 text-left text-sm gap-3 transition-all duration-200 group ${
                          item.isActive
                            ? "bg-blue-50 text-blue-700 font-medium shadow-sm"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        {item.icon && (
                          <item.icon
                            className={`h-5 w-5 ${
                              item.isActive
                                ? "text-blue-600"
                                : "text-gray-500 group-hover:text-gray-700"
                            }`}
                          />
                        )}
                        <span className="flex-1 font-medium">{item.title}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openItems[item.title] ? "rotate-180" : ""
                          } ${
                            item.isActive ? "text-blue-600" : "text-gray-400"
                          }`}
                        />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub className="ml-8 mt-2 space-y-1">
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={subItem.isActive}
                              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 data-[active=true]:text-blue-700 data-[active=true]:bg-blue-50 data-[active=true]:font-medium"
                            >
                              <a href={subItem.url} className="py-2">
                                {subItem.title}
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-700 data-[active=true]:font-medium data-[active=true]:shadow-sm p-3 group"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      {item.icon && (
                        <item.icon
                          className={`h-5 w-5 ${
                            item.isActive
                              ? "text-blue-600"
                              : "text-gray-500 group-hover:text-gray-700"
                          }`}
                        />
                      )}
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-100 bg-white p-4">
        {/* Plan Info */}
        <div className="rounded-xl bg-gray-50 p-4 mb-4 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
              <Shield className="size-4" />
            </div>
            <div className="text-sm font-medium text-gray-900">
              Plano Profissional
            </div>
          </div>
          <div className="text-xs text-gray-600">Renovação em 15 dias</div>
        </div>

        {/* Logout */}
        <button
          onClick={SingOut}
          className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gray-200 group-hover:bg-red-100 text-gray-600 group-hover:text-red-600 transition-colors">
            <LogOut className="size-4" />
          </div>
          <span className="text-sm font-medium">Sair da Conta</span>
        </button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
