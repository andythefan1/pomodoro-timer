import AppHeader from '../AppHeader';
import SettingsButton from '../SettingsButton';
import './styles.css';

export default function Header() {
	return (
		<nav className='header'>
			<AppHeader></AppHeader>
			<SettingsButton></SettingsButton>
		</nav>
	);
}
