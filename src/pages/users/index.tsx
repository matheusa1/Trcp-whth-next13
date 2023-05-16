import Card from '@/components/Card'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

const Users = (): ReactElement => {
	const router = useRouter()
	const { data } = trpc.getUsers.useQuery()
	const users = data?.users

	console.log(data)
	return (
		<div className={`flex-1 py-10`}>
			<button onClick={() => router.push('/')}>voltar</button>
			<div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 place-items-center w-full gap-4'>
				{users &&
					users.map((user) => {
						return (
							<Card
								key={user.id}
								name={user.name}
								bio={user.description}
							/>
						)
					})}
			</div>
		</div>
	)
}

export default Users
