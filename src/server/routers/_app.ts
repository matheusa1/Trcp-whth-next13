import { z } from 'zod'
import { procedure, router } from '../trpc'

export const appRouter = router({
	hello: procedure.query(async ({ ctx }) => {
		const count = await ctx.prisma.user.count()

		return {
			greeting: `Usuários: ${count}`,
		}
	}),

	createUser: procedure
		.input(
			z.object({
				name: z.string(),
				email: z.string(),
				password: z.string(),
				description: z.string(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			try {
				const emailUsed = await ctx.prisma.user.findMany({
					where: {
						email: input.email,
					},
				})

				if (emailUsed.length > 0) {
					return {
						success: false,
						message: 'Email já cadastrado',
						status: 409,
					}
				}

				await ctx.prisma.user.create({
					data: {
						name: input.name,
						email: input.email,
						password: input.password,
						description: input.description,
					},
				})

				return {
					success: true,
					message: 'Usuário criado com sucesso',
					status: 201,
				}
			} catch (error) {
				return {
					success: false,
					message: 'Erro ao criar usuário',
					status: 500,
				}
			}
		}),

	getUsers: procedure.query(async ({ ctx }) => {
		try {
			const users = await ctx.prisma.user.findMany()

			const usersList = users.map((user) => {
				return {
					id: user.id,
					name: user.name,
					description: user.description,
				}
			})
			return {
				success: true,
				message: 'Usuários encontrados',
				status: 201,
				users: usersList,
			}
		} catch (error) {
			return {
				success: false,
				message: 'Erro ao buscar usuários',
				status: 500,
				users: [],
			}
		}
	}),
})

export type AppRouter = typeof appRouter
