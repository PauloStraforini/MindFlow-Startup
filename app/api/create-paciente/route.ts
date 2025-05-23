// import { NextRequest } from 'next/server';
// import { z } from 'zod';
// import prisma from '@/lib/prisma';

// const createUserBodySchema = z.object({
//   nome: z.string().min(1, {
//     message: 'O campo nome é obrigatório',
//   }),
//   cpf: z.string().min(1, {
//     message: 'O campo de CPF é obrigatório',
//   }),
//   email: z.string().email({
//     message: 'O campo de email deve ser um email válido',
//   }),
//   telefone: z.string().optional(),
//   dataNascimento: z.coerce.date().refine((date) => date instanceof Date && !isNaN(date.getTime()), {
//     message: 'Data de nascimento inválida',
//   }),
//   endereco: z.string().optional(),
// });

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     const parsedBody = createUserBodySchema.safeParse(body);

//     if (!parsedBody.success) {
//       console.error('Erros de validação:', parsedBody.error.format());
      
//       return new Response(
//         JSON.stringify({
//           message: 'Erro de validação',
//           errors: parsedBody.error.format(),
//         }),
//         { status: 400 }
//       );
//     }

//     const { nome, cpf, email, telefone, dataNascimento, endereco } = parsedBody.data;

//     const formattedCpf = cpf.replace(/[^\d]/g, '');

//     const existingUserByCpf = await prisma.paciente.findUnique({ where: { cpf: formattedCpf } });
//     if (existingUserByCpf) {
//       return new Response(
//         JSON.stringify({ message: 'Paciente com esse CPF já está cadastrado' }),
//         { status: 400 }
//       );
//     }

//     const existingUserByEmail = await prisma.paciente.findUnique({ where: { email } });
//     if (existingUserByEmail) {
//       return new Response(
//         JSON.stringify({ message: 'Paciente com esse e-mail já está cadastrado' }),
//         { status: 400 }
//       );
//     }

//     const newPaciente = await prisma.paciente.create({
//       data: {
//         nome,
//         cpf: formattedCpf,
//         email,
//         telefone,
//         dataNascimento: new Date(dataNascimento), 
//         endereco,
//       },
//     });

//     return new Response(
//       JSON.stringify({ message: 'Paciente criado com sucesso', paciente: newPaciente }),
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Erro ao criar paciente:', error);
//     return new Response(
//       JSON.stringify({ message: 'Erro ao criar paciente', error: error instanceof Error ? error.message : 'Erro desconhecido' }),
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }
