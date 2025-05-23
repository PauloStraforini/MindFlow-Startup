import { NextRequest } from "next/server";

import { z } from "zod";
import prisma from "@/lib/prisma";

type IpacienteParams = {
  params: Promise<{
    id: string
  }>
}

export async function GET(request: NextRequest, { params }: IpacienteParams) {
  const { id } = await params

  try {

    const user = await prisma.paciente.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: 'Nenhum usuário encontrado' }), {
        status: 400,
      })
    }

    return new Response(JSON.stringify(user), {
      status: 200,
    })
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ message: 'Erro ao procurar usuario' }), {
      status: 500,
    })
  } finally {
    await prisma.$disconnect();
  }
}

const updateUserBodySchema = z.object({
  name: z.string().min(1, {
    message: 'O campo nome é obrigatório'
  }),
  cpf: z.string().min(1, {
    message: 'O campo de cpf é obrigatório'
  }),
  role: z.enum(['ADMIN', 'MANAGER', 'USER']),
  dateOfBirth: z.coerce.date(),
})

export async function PUT(request: NextRequest, { params }: IpacienteParams) {
  const body = await request.json();
  const { name, cpf, role, dateOfBirth } = updateUserBodySchema.parse(body);

  const { id } = await params

  try {
    const existingUser = await prisma.paciente.findUnique({
      where: {
        id: Number(id),
      },
    })

    const existingUserBycpf = await prisma.paciente.findUnique({
      where: { cpf }
    })

    if (existingUserBycpf && cpf !== existingUser?.cpf) {
      return new Response(JSON.stringify({ message: 'Usuário com esse cpf já está cadastrado' }), {
        status: 400,
      });
    }

    // const updatedUser = await prisma.paciente.update({
    //   where: {
    //     id: Number(id),
    //   },
    //   data: {
    //     name,
    //     cpf,
    //     role,
    //     dateOfBirth,
    //   },
    // });

    // if (!updatedUser) {
    //   return new Response(JSON.stringify({ message: 'Erro ao atualizar Usuario' }), {
    //     status: 400,
    //   })
    // }

    return new Response(JSON.stringify({ message: 'Usuário atualizado com sucesso' }), {
      status: 200,
    })
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ message: 'Erro ao atualizar Usuario' }), {
      status: 500,
    })
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: NextRequest, { params }: IpacienteParams) {
  const { id } = await params

  try {
    const deletedUser = await prisma.paciente.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deletedUser) {
      return new Response(JSON.stringify({ message: 'Erro ao deletar Usuario' }), {
        status: 400,
      })
    }

    return new Response(JSON.stringify({ message: 'Usuário deletado com sucesso' }), {
      status: 200,
    })
  } catch (error) {
    console.error("Error deleting User:", error);
    return new Response(JSON.stringify({ message: 'Erro ao deletar Usuario' }), {
      status: 500,
    })
  } finally {
    await prisma.$disconnect();
  }
}