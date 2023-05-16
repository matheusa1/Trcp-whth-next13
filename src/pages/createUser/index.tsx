import { trpc } from '@/utils/trpc'
import React, { ReactElement, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Toast from '@/components/Toast'
import { useRouter } from 'next/router'

const createUserFormSchema = z
	.object({
		name: z
			.string()
			.nonempty('O nome não pode ser vazio')
			.transform((name) => {
				return name
					.trim()
					.split(' ')
					.map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
					.join(' ')
			}),
		email: z
			.string()
			.nonempty('O e-mail não pode ser vazio')
			.email('Formato de e-mail inválido'),
		description: z.string().nonempty('A descrição não pode ser vazia'),
		password: z
			.string()
			.nonempty('A senha não pode ser vazia')
			.min(6, 'A senha deve ter no mínimo 6 caracteres'),
		passwordConfirmation: z
			.string()
			.nonempty('A confirmação de senha não pode ser vazia'),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: 'As senhas não coincidem',
		path: ['passwordConfirmation'],
	})

type createUserFormData = z.infer<typeof createUserFormSchema>

const CreateUser = (): ReactElement => {
	const { mutateAsync: createUserAPI } = trpc.createUser.useMutation()
	const [isToastOpen, setIsToastOpen] = useState(false)
	const [error, setError] = useState(false)
	const [emailError, setEmailError] = useState({
		error: false,
		emailError: '',
	})
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<createUserFormData>({
		resolver: zodResolver(createUserFormSchema),
	})

	const createUser = async (data: any) => {
		const result = await createUserAPI({
			name: data.name,
			email: data.email,
			description: data.description,
			password: data.password,
		})

		console.log(result)

		if (result.status === 409) {
			setEmailError({
				error: true,
				emailError: data.email,
			})
		} else {
			setEmailError({
				error: false,
				emailError: '',
			})
		}

		if (result.status === 201) {
			setIsToastOpen(true)
			setError(false)
			setTimeout(() => {
				setIsToastOpen(false)
				router.push('/')
			}, 2000)
		}
	}

	return (
		<div className={`flex-1 flex items-center justify-center flex-col`}>
			<Toast
				error={error}
				open={isToastOpen}
			/>
			<button
				onClick={() => router.push('/')}
				className='absolute top-10 left-10'
			>
				Voltar
			</button>
			<form
				onSubmit={handleSubmit(createUser)}
				className='flex flex-col space-y-4 w-fit items-center bg-gray-800 p-8 rounded'
			>
				<h1 className='text-3xl font-bold mb-10'>Crie um usuário</h1>
				<div className='flex flex-col space-y-1'>
					<label htmlFor='name'>Nome</label>
					<input
						id='name'
						type='text'
						className={`w-80 px-4 py-2 bg-transparent border-2 border-gray-600 rounded outline-none hover:border-gray-400 transition-colors active:border-gray-400 focus:border-gray-400`}
						{...register('name')}
					/>
					{errors.name && (
						<p className='text-red-500 text-xs italic'>{errors.name.message}</p>
					)}
				</div>
				<div className='flex flex-col space-y-1'>
					<label htmlFor='email'>E-mail</label>
					<input
						id='email'
						type='email'
						className={`w-80 px-4 py-2 bg-transparent border-2 border-gray-600 rounded outline-none hover:border-gray-400 transition-colors active:border-gray-400 focus:border-gray-400`}
						{...register('email')}
					/>
					{errors.email && (
						<p className='text-red-500 text-xs italic'>
							{errors.email.message}
						</p>
					)}
					{emailError.error && (
						<p className='text-red-500 text-xs italic'>{`O email ${emailError.emailError} já está em uso`}</p>
					)}
				</div>
				<div className='flex flex-col space-y-1'>
					<label htmlFor='description'>Descrição</label>
					<textarea
						id='description'
						className={`w-80 px-4 py-2 bg-transparent border-2 border-gray-600 rounded outline-none hover:border-gray-400 transition-colors active:border-gray-400 focus:border-gray-400`}
						{...register('description')}
					/>
					{errors.description && (
						<p className='text-red-500 text-xs italic'>
							{errors.description.message}
						</p>
					)}
				</div>
				<div className='flex flex-col space-y-1'>
					<label htmlFor='password'>Senha</label>
					<input
						id='password'
						type='password'
						className={`w-80 px-4 py-2 bg-transparent border-2 border-gray-600 rounded outline-none hover:border-gray-400 transition-colors active:border-gray-400 focus:border-gray-400`}
						{...register('password')}
					/>
					{errors.password && (
						<p className='text-red-500 text-xs italic'>
							{errors.password.message}
						</p>
					)}
				</div>
				<div className='flex flex-col space-y-1'>
					<label htmlFor='passwordConfirmation'>Confirme a senha</label>
					<input
						id='passwordConfirmation'
						type='password'
						className={`w-80 px-4 py-2 bg-transparent border-2 border-gray-600 rounded outline-none hover:border-gray-400 transition-colors active:border-gray-400 focus:border-gray-400`}
						{...register('passwordConfirmation')}
					/>
					{errors.passwordConfirmation && (
						<p className='text-red-500 text-xs italic'>
							{errors.passwordConfirmation.message}
						</p>
					)}
				</div>
				<button
					className='border-2 border-green-600 w-full py-2 px-4 rounded text-green-500 hover:bg-green-600 hover:text-white transition-colors'
					type='submit'
				>
					Criar
				</button>
			</form>
		</div>
	)
}

export default CreateUser
