import AppHeader from '../AppHeader';
import SettingsButton from '../SettingsButton';
import './styles.css';

export default function Header() {
	return (
		<div className='header'>
			<AppHeader></AppHeader>
			<SettingsButton></SettingsButton>
		</div>
	);
}
