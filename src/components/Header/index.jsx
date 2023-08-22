import AppHeader from '../AppHeader';
import './styles.css';

export default function Header() {
	return (
		<nav className='header'>
			<AppHeader></AppHeader>
			<div className='header-nav-menu'>
				<span className='material-symbols-rounded'>settings</span>
				<span className='material-symbols-rounded'>menu</span>
			</div>
		</nav>
	);
}
