import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { trpc } from '@/utils/trpc'
import type { AppProps } from 'next/app'

import { ToastProvider, ToastViewport } from '@radix-ui/react-toast'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ToastProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
			<ToastViewport />
		</ToastProvider>
	)
}

export default trpc.withTRPC(App)
