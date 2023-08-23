import './styles.css';

export default function Header() {
	return (
		<nav className='header'>
			<li className='header-app-logo'>
				<span className='header-icon material-symbols-rounded'>timer</span>
				<h1 className='app-logo-text'>PomoTimer</h1>
			</li>
			<li className='header-nav-menu'>
				<span className='header-icon material-symbols-rounded'>settings</span>
				<span className='header-icon material-symbols-rounded'>
					account_circle
				</span>
			</li>
			<li className='header-nav-menu-mobile'>
				<span className='header-icon material-symbols-rounded'>menu</span>
			</li>
		</nav>
	);
}
