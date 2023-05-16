import React, { ReactElement, ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }): ReactElement => {
	return (
		<div className={`w-screen h-screen overflow-x-hidden flex`}>{children}</div>
	)
}

export default Layout
