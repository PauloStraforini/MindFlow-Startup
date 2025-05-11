import { NextRequest } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';

// Definindo o esquema para validar os dados recebidos no corpo da requisição
const createUserBodySchema = z.object({
    nome: z.string().min(1, {
        message: 'O campo nome é obrigatório'
    }),
    cpf: z.string().min(1, {
        message: 'O campo de CPF é obrigatório'
    }),
    email: z.string().email({
        message: 'O campo de email deve ser um email válido'
    }),
    telefone: z.string().optional(),
    dataNascimento: z.coerce.date(),
    endereco: z.string().optional(),
});

export async function GET(request: NextRequest) {
    try {
        // Busca todos os pacientes no banco de dados
        const pacientes = await prisma.paciente.findMany({
            select: {
                id: true,
                nome: true,
                cpf: true,
                email: true,
                telefone: true,
                dataNascimento: true,
                endereco: true,
            },
        });

        // Retorna a resposta de sucesso com a lista de pacientes
        return new Response(
            JSON.stringify({ pacientes }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
        return new Response(
            JSON.stringify({ message: 'Erro ao buscar pacientes', error: error instanceof Error ? error.message : 'Erro desconhecido' }),
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect(); // Desconecta do Prisma após a operação
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Valida os dados
        const { nome, cpf, email, telefone, dataNascimento, endereco } = createUserBodySchema.parse(body);

        // Verifica se o CPF ou email já existe
        const existingUserByCpf = await prisma.paciente.findUnique({ where: { cpf } });
        if (existingUserByCpf) {
            return new Response(
                JSON.stringify({ message: 'Paciente com esse CPF já está cadastrado' }),
                { status: 400 }
            );
        }

        const existingUserByEmail = await prisma.paciente.findUnique({ where: { email } });
        if (existingUserByEmail) {
            return new Response(
                JSON.stringify({ message: 'Paciente com esse e-mail já está cadastrado' }),
                { status: 400 }
            );
        }

        // Criação do paciente no banco de dados
        const newPaciente = await prisma.paciente.create({
            data: {
                nome,
                cpf,
                email,
                telefone,
                dataNascimento,
                endereco,
            },
        });

        return new Response(
            JSON.stringify({ message: 'Paciente criado com sucesso', paciente: newPaciente }),
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Retorna erros de validação detalhados
            return new Response(
                JSON.stringify({
                    message: 'Erro de validação',
                    errors: error.errors,
                }),
                { status: 400 }
            );
        }

        console.error("Erro ao criar paciente:", error);
        return new Response(
            JSON.stringify({ message: 'Erro ao criar paciente' }),
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}