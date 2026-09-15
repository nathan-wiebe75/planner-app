type NavbarProps = {
	title?: string
}

function Navbar({ title = 'Planner' }: NavbarProps) {
	return (
		<header className="top-nav">
			<p className="top-nav__title">{title}</p>
		</header>
	)
}

export default Navbar
