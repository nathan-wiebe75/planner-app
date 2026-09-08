type NavbarProps = {
	title?: string
}

function Navbar({ title = 'Planner' }: NavbarProps) {
	return (
		<nav aria-label="Main navigation">
			<a href="/">{title}</a>
			<ul>
				<li>
					<a href="/">Dashboard</a>
				</li>
				<li>
					<a href="/assignments">Assignments</a>
				</li>
				<li>
					<a href="/classes">Classes</a>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
