import React, { ReactElement } from 'react'

interface CardPorps {
	name: string | null
	bio: string | null
}

const Card = ({ bio, name }: CardPorps): ReactElement => {
	return (
		<div className={`bg-slate-800 p-4 rounded w-80 h-full`}>
			<h1 className='text-lg'>{name}</h1>
			<p className='text-xs text-gray-400'>{bio}</p>
		</div>
	)
}

export default Card
