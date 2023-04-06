import AppHeader from '../AppHeader';
import SettingsIcon from '../SettingsIcon';
import './styles.css';

export default function Header() {
	return (
		<div className='header'>
			<AppHeader></AppHeader>
			<SettingsIcon></SettingsIcon>
		</div>
	);
}
