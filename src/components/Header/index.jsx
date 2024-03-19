import './styles.css';

const Header = () => {
	return (
		<nav className='header'>
			<ul className='nav-links'>
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
			</ul>
		</nav>
	);
};

export default Header;
