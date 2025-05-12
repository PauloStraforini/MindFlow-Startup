"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { FaIdCard, FaCalendarAlt, FaUser } from "react-icons/fa"
import { MdAppRegistration } from "react-icons/md"
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import axios from 'axios';

import { toast } from "sonner"

import { AppSidebar } from "@/components/ui/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AxiosError from "axios"

const createPacienteFormSchema = z.object({
  nome: z.string().min(1, {
    message: "O campo nome é obrigatório",
  }),
  cpf: z.string().min(1, {
    message: "O campo de CPF é obrigatório",
  }),
  email: z.string().email({
    message: "Formato de e-mail inválido",
  }),
  dataNascimento: z.coerce.date({
    invalid_type_error: "Data inválida",
  }),
  telefone: z.string().optional(),
  endereco: z.string().optional(),
})

type IcreatePacienteForm = z.infer<typeof createPacienteFormSchema>

export default function CadastroPaciente() {
  const router = useRouter()

  const [pacientes, setPacientes] = useState<{ id?: string; nome: string; cpf: string; email: string; dataNascimento: string; telefone?: string }[] | null>([])
  const [isLoading, setIsLoading] = useState(true)

  const carregarPacientes = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get<{ id?: string; nome: string; cpf: string; email: string; dataNascimento: string; telefone?: string }[]>("/api/create-paciente") // Update the endpoint to the correct path
      setPacientes(response.data)
    } catch (error) {
      console.error("Erro ao carregar pacientes:", error)
      toast.error("Não foi possível carregar a lista de pacientes")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    carregarPacientes()
  }, [])

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IcreatePacienteForm>({
    resolver: zodResolver(createPacienteFormSchema),
  })

const handleCreatePaciente = async (data: IcreatePacienteForm) => {
  try {
    console.log("📤 Enviando dados:", data);
    const response = await axios.post("/api/create-paciente", {
      ...data,
      dataNascimento: new Date(data.dataNascimento).toISOString(),
    });
    toast.success("Paciente cadastrado com sucesso!");
    reset();
    carregarPacientes(); // Recarrega a lista após cadastrar
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = await (await error).data.message
      toast.error("Erro ao cadastrar paciente. Verifique os dados.");
    } else {
      console.error("❌ Erro inesperado:", error);
      toast.error("Erro ao cadastrar paciente. Tente novamente.");
    }
  }
};

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-pink-100 dark:border-pink-800 px-4 bg-white dark:bg-pink-950/50">
          <SidebarTrigger className="-ml-1 text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-pink-200 dark:bg-pink-700" />
          <div className="ml-auto">
            <Link href="/pacientes">
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-pink-50 hover:bg-pink-100 text-pink-600 text-sm font-medium transition-colors">
                <ArrowLeft className="size-4" />
                <span>Voltar</span>
              </button>
            </Link>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 bg-gradient-to-b from-slate-50 to-pink-50 dark:from-pink-950 dark:to-pink-900 min-h-screen">
          <div className=" gap-4 ">
            {/* Form Card */}
            <Card className=" bg-white dark:bg-pink-900/50 border-pink-100 dark:border-pink-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-pink-900 dark:text-pink-100 flex items-center gap-2">
                  <MdAppRegistration className="size-5 text-pink-600 dark:text-pink-400" />
                  Cadastro de Novo Paciente
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Preencha os dados abaixo para cadastrar um novo paciente no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-5" onSubmit={handleSubmit(handleCreatePaciente)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Nome */}
                    <div>
                      <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nome
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="size-4 text-pink-500" />
                        </div>
                        <input
                          id="nome"
                          type="text"
                          disabled={isSubmitting}
                          placeholder="Nome completo"
                          {...register("nome", { required: true })}
                          className={`appearance-none block w-full px-3 py-2.5 pl-10 border ${
                            errors.nome ? "border-red-500" : "border-pink-200 dark:border-pink-700"
                          } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm text-gray-800 dark:text-white dark:bg-pink-950/30 transition-all duration-200`}
                        />
                      </div>
                      {errors.nome && <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>}
                    </div>

                    {/* CPF */}
                    <div>
                      <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        CPF
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaIdCard className="size-4 text-pink-500" />
                        </div>
                        <input
                          id="cpf"
                          type="text"
                          disabled={isSubmitting}
                          placeholder="000.000.000-00"
                          {...register("cpf", { required: true })}
                          className={`appearance-none block w-full px-3 py-2.5 pl-10 border ${
                            errors.cpf ? "border-red-500" : "border-pink-200 dark:border-pink-700"
                          } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm text-gray-800 dark:text-white dark:bg-pink-950/30 transition-all duration-200`}
                        />
                      </div>
                      {errors.cpf && <p className="mt-1 text-sm text-red-600">{errors.cpf.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="size-4 text-pink-500" />
                        </div>
                        <input
                          id="email"
                          type="email"
                          disabled={isSubmitting}
                          placeholder="email@exemplo.com"
                          {...register("email", { required: true })}
                          className={`appearance-none block w-full px-3 py-2.5 pl-10 border ${
                            errors.email ? "border-red-500" : "border-pink-200 dark:border-pink-700"
                          } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm text-gray-800 dark:text-white dark:bg-pink-950/30 transition-all duration-200`}
                        />
                      </div>
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>

                    {/* Data de Nascimento */}
                    <div>
                      <label
                        htmlFor="dataNascimento"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Data de Nascimento
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaCalendarAlt className="size-4 text-pink-500" />
                        </div>
                        <input
                          id="dataNascimento"
                          type="date"
                          disabled={isSubmitting}
                          {...register("dataNascimento")}
                          className={`appearance-none block w-full px-3 py-2.5 pl-10 border ${
                            errors.dataNascimento ? "border-red-500" : "border-pink-200 dark:border-pink-700"
                          } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm text-gray-800 dark:text-white dark:bg-pink-950/30 transition-all duration-200`}
                        />
                      </div>
                      {errors.dataNascimento && (
                        <p className="mt-1 text-sm text-red-600">{errors.dataNascimento.message}</p>
                      )}
                    </div>

                    {/* Telefone */}
                    <div>
                      <label
                        htmlFor="telefone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Telefone
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="size-4 text-pink-500" />
                        </div>
                        <input
                          id="telefone"
                          type="text"
                          disabled={isSubmitting}
                          placeholder="(00) 00000-0000"
                          {...register("telefone")}
                          className={`appearance-none block w-full px-3 py-2.5 pl-10 border ${
                            errors.telefone ? "border-red-500" : "border-pink-200 dark:border-pink-700"
                          } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm text-gray-800 dark:text-white dark:bg-pink-950/30 transition-all duration-200`}
                        />
                      </div>
                      {errors.telefone && <p className="mt-1 text-sm text-red-600">{errors.telefone.message}</p>}
                    </div>

                    {/* Endereço */}
                    <div>
                      <label
                        htmlFor="endereco"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Endereço
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="size-4 text-pink-500" />
                        </div>
                        <input
                          id="endereco"
                          type="text"
                          disabled={isSubmitting}
                          placeholder="Endereço completo"
                          {...register("endereco")}
                          className={`appearance-none block w-full px-3 py-2.5 pl-10 border ${
                            errors.endereco ? "border-red-500" : "border-pink-200 dark:border-pink-700"
                          } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm text-gray-800 dark:text-white dark:bg-pink-950/30 transition-all duration-200`}
                        />
                      </div>
                      {errors.endereco && <p className="mt-1 text-sm text-red-600">{errors.endereco.message}</p>}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-2 px-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition duration-200 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {isSubmitting ? "Cadastrando..." : "Cadastrar Paciente"}
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Tabela de Pacientes */}
            <Card className="md:col-span-3 bg-white mt-4 dark:bg-pink-900/50 border-pink-100 dark:border-pink-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-pink-900 dark:text-pink-100 flex items-center gap-2">
                  <FaUser className="size-5 text-pink-600 dark:text-pink-400" />
                  Pacientes Cadastrados
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Lista de todos os pacientes cadastrados no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
                  </div>
                ) : (pacientes && pacientes.length === 0) ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Nenhum paciente cadastrado ainda.
                  </div>
                ) : (
                    <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                      <tr className="bg-pink-50 dark:bg-pink-800/50 text-left">
                        <th className="px-4 py-3 text-sm font-medium text-pink-900 dark:text-pink-100">Nome</th>
                        <th className="px-4 py-3 text-sm font-medium text-pink-900 dark:text-pink-100">CPF</th>
                        <th className="px-4 py-3 text-sm font-medium text-pink-900 dark:text-pink-100">Email</th>
                        <th className="px-4 py-3 text-sm font-medium text-pink-900 dark:text-pink-100">
                        Data de Nascimento
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-pink-900 dark:text-pink-100">Telefone</th>
                      </tr>
                      </thead>
                      <tbody>
                      {Array.isArray(pacientes) && pacientes.map((paciente, index) => (
                        <tr
                        key={paciente.id || index}
                        className={`border-b border-pink-100 dark:border-pink-800 ${
                          index % 2 === 0 ? "bg-white dark:bg-pink-900/30" : "bg-pink-50/50 dark:bg-pink-900/50"
                        } hover:bg-pink-100 dark:hover:bg-pink-800/50 transition-colors`}
                        >
                        <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">{paciente.nome}</td>
                        <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">{paciente.cpf}</td>
                        <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">{paciente.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">
                          {new Date(paciente.dataNascimento).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">
                          {paciente.telefone || "-"}
                        </td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                    </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
