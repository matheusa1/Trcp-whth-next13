import Link from 'next/link'
import React, { ReactElement } from 'react'

const pages = (): ReactElement => {
	return (
		<div className={`flex space-x-4 flex-1 items-center justify-center`}>
			<Link href={'/createUser'}>
				<h1 className='p-2 bg-green-500 border-2 border-green-600 rounded hover:bg-green-600 transition-all'>
					Create User
				</h1>
			</Link>
			<Link href={'/users'}>
				<h1 className='p-2 bg-green-500 border-2 border-green-600 rounded hover:bg-green-600 transition-all'>
					See Users
				</h1>
			</Link>
		</div>
	)
}

export default pages
