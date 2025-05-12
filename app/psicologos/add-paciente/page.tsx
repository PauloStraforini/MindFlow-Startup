"use client";
import { useState, useEffect } from "react";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  RefreshCw,
  Users,
  FileText,
  Plus,
  Search,
  Filter,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import EditPacienteModal from "./components/edit-paciente-modal";
import DeletePacienteModal from "./components/delete-paciente-modal";
import CreatePacienteModal from "./components/create-paciente-modal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";

type Ipaciente = {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone?: string;
  dataNascimento: string;
  endereco?: string;
  createdAt: string;
};

export default function AddPacientePage() {
  const queryClient = useQueryClient();

  const {
    data: paciente,
    isLoading,
    error,
  } = useQuery<Ipaciente[]>({
    queryKey: ["add-paciente"],
    queryFn: async (): Promise<Ipaciente[]> => {
      const response = await api.get<Ipaciente[]>("/psicologos/add-paciente");
      return response.data;
    },
  });

  const [isEditPacienteModalOpen, setIsEditPacienteModalOpen] = useState(false);
  const [isDeletePacienteModalOpen, setIsDeletePacienteModalOpen] =
    useState(false);
  const [isCreatePacienteModalOpen, setIsCreatePacienteModalOpen] =
    useState(false);

  const [currentPacienteId, setCurrentPacienteId] = useState<number | null>(
    null
  );

  const handleOpenEditPacienteModal = (PacienteId: number) => {
    setCurrentPacienteId(PacienteId);
    setIsEditPacienteModalOpen(true);
  };

  const handleOpenDeletePacienteModal = (PacienteId: number) => {
    setCurrentPacienteId(PacienteId);
    setIsDeletePacienteModalOpen(true);
  };

  const loadPacientes = async () => {
    try {
      queryClient.invalidateQueries({
        queryKey: ["pacientes"],
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    loadPacientes();
  }, []);

  const handleResetFilters = () => {
    loadPacientes();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <header className="bg-white border-b border-purple-100 shadow-sm">
        <div className="container mx-auto py-5 px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-purple-900 flex items-center">
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7 mr-3 text-purple-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" />
                <path d="M15 9L9 15" />
                <path d="M9 9L15 15" />
              </svg>
              MINDFLOW
            </h1>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadPacientes()}
                className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-6">
        <Card className="mb-8 shadow-md border-none overflow-hidden bg-white">
          <CardHeader className="pb-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardTitle className="text-2xl font-medium">
              Gerenciamento de Pacientes
            </CardTitle>
            <CardDescription className="text-purple-50">
              Visualize, adicione, edite e remova pacientes do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={"list"} className="w-full">
              <div className="border-b border-purple-100 px-6 bg-white">
                <TabsList className="bg-transparent h-12">
                  <TabsTrigger
                    value="list"
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-500 data-[state=active]:text-purple-700 data-[state=active]:shadow-none rounded-none h-12 text-gray-600"
                  >
                    <FileText className="size-4 mr-2" />
                    Lista de Pacientes
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="list" className="p-6 pt-4">
                <div className="mb-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-purple-800">
                        Pacientes cadastrados
                      </h3>
                      <Badge
                        variant="outline"
                        className="ml-3 bg-purple-50 text-purple-700 border-purple-200"
                      >
                        {Array.isArray(paciente) ? paciente.length : 0} itens
                      </Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Buscar serviço..."
                          className="pl-9 w-full sm:w-64 border-purple-200 focus-visible:ring-purple-500"
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-purple-200 text-purple-700 hover:bg-purple-50"
                      >
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator className="my-6 bg-purple-100" />

                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
                      <p className="text-purple-700">
                        Carregando todos os Pacientes...
                      </p>
                    </div>
                  </div>
                ) : error ? (
                  <div className="bg-red-50 p-6 rounded-lg text-center">
                    <div className="text-red-500 mb-4 text-lg font-medium">
                      {error.message}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => loadPacientes()}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Tentar novamente
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-md border border-purple-100 overflow-hidden">
                    <Table>
                      <TableHeader className="bg-purple-50">
                        <TableRow className="hover:bg-purple-50/80">
                          <TableHead className="font-semibold text-purple-900 w-32">
                            CPF
                          </TableHead>
                          <TableHead className="font-semibold text-purple-900 w-48">
                            Nome
                          </TableHead>
                          <TableHead className="font-semibold text-purple-900 w-48">
                            Data de Nascimento
                          </TableHead>
                          <TableHead className="font-semibold text-purple-900 w-48">
                            Email
                          </TableHead>
                          <TableHead className="font-semibold text-center w-24">
                            Telefone
                          </TableHead>
                          <TableHead className="font-semibold text-center w-48">
                            Endereço
                          </TableHead>

                          <TableHead className="font-semibold text-center w-24 text-purple-900">
                            Ações
                          </TableHead>
                          <TableHead className="font-medium w-10">
                            <Dialog
                              open={isCreatePacienteModalOpen}
                              onOpenChange={setIsCreatePacienteModalOpen}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="secondary"
                                  type="button"
                                  size="icon"
                                  className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white"
                                >
                                  <Plus />
                                </Button>
                              </DialogTrigger>

                              <CreatePacienteModal
                                isOpen={isCreatePacienteModalOpen}
                                onSetIsCreatePacienteModalOpen={
                                  setIsCreatePacienteModalOpen
                                }
                              />
                            </Dialog>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Verifique se "paciente" é um array e não está vazio */}
                        {Array.isArray(paciente) && paciente.length > 0 ? (
                          paciente.map(
                            ({
                              id,
                              nome,
                              cpf,
                              dataNascimento,
                              endereco,
                              email,
                              telefone,
                            }) => (
                              <TableRow
                                key={id}
                                className="hover:bg-purple-50/50 transition-colors border-b border-purple-100"
                              >
                                <TableCell className="py-4 text-sm font-medium text-purple-900">
                                  {cpf}
                                </TableCell>
                                <TableCell className="py-4 text-sm font-medium text-purple-900">
                                  {nome}
                                </TableCell>
                                <TableCell className="py-4 text-sm font-medium text-purple-900">
                                  {new Date(dataNascimento).toLocaleDateString(
                                    "pt-BR"
                                  )}
                                </TableCell>
                                <TableCell className="py-4 text-sm font-medium text-purple-900">
                                  {email}
                                </TableCell>
                                <TableCell className="py-4 text-sm font-medium text-purple-900">
                                  {telefone}
                                </TableCell>
                                <TableCell className="py-4 text-sm font-medium text-purple-900">
                                  {endereco}
                                </TableCell>

                                <TableCell className="text-center py-4">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 hover:bg-purple-100 hover:text-purple-700"
                                      >
                                        <MoreHorizontal className="h-4 w-4 text-purple-600" />
                                        <span className="sr-only">
                                          Abrir menu
                                        </span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                      align="end"
                                      className="border-purple-100"
                                    >
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleOpenEditPacienteModal(id)
                                        }
                                        className="hover:bg-purple-50 hover:text-purple-700 cursor-pointer"
                                      >
                                        <Edit className="mr-2 size-4" />
                                        Editar
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleOpenDeletePacienteModal(id)
                                        }
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                                      >
                                        <Trash2 className="mr-2 size-4" />
                                        Excluir
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            )
                          )
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={7}
                              className="text-center py-16 text-purple-700"
                            >
                              <div className="flex flex-col items-center">
                                <Users className="h-12 w-12 text-purple-300 mb-3" />
                                <p className="text-lg font-medium mb-1">
                                  Nenhum paciente encontrado
                                </p>
                                <p className="text-sm text-purple-600 mb-4">
                                  Adicione um novo paciente ou ajuste os filtros
                                </p>
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    handleResetFilters();
                                    loadPacientes();
                                  }}
                                  className="mt-2 border-purple-200 text-purple-700 hover:bg-purple-50"
                                >
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  Limpar filtros e tentar novamente
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Edit Dialog */}
      <Dialog
        open={isEditPacienteModalOpen}
        onOpenChange={setIsEditPacienteModalOpen}
      >
        <EditPacienteModal
          id={currentPacienteId}
          isOpen={isEditPacienteModalOpen}
          onSetIsEditPacienteModalOpen={setIsEditPacienteModalOpen}
        />
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeletePacienteModalOpen}
        onOpenChange={setIsDeletePacienteModalOpen}
      >
        <DeletePacienteModal
          id={currentPacienteId}
          isOpen={isDeletePacienteModalOpen}
          onSetIsDeletePacienteModalOpen={setIsDeletePacienteModalOpen}
        />
      </Dialog>
    </div>
  );
}
