import React, { ReactElement } from 'react'

import * as Toasts from '@radix-ui/react-toast'
import { useRouter } from 'next/router'

interface ToastProps {
	open: boolean
	error: boolean
}

const Toast = ({ open, error }: ToastProps): ReactElement => {
	return (
		<Toasts.Root
			open={open}
			className={`fixed top-10 right-10 data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut`}
		>
			<div
				className={`border-2 p-4 rounded-lg ${
					error
						? 'border-red-500 bg-slate-950'
						: 'border-green-500 bg-slate-950'
				}`}
			>
				<h1>
					{error
						? 'Houve um erro ao criar o usuário'
						: 'Usuário criado com sucesso'}
				</h1>
			</div>
		</Toasts.Root>
	)
}

export default Toast
