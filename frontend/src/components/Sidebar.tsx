import type { ReactNode } from 'react'

type SidebarProps = {
	children?: ReactNode
}

function Sidebar({ children }: SidebarProps) {
	return (
		<aside aria-label="Sidebar">
			{children ?? (
				<nav>
					<a href="/">Dashboard</a>
					<a href="/assignments">Assignments</a>
					<a href="/classes">Classes</a>
				</nav>
			)}
		</aside>
	)
}

export default Sidebar
