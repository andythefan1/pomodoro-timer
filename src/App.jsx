import './App.css';
import PomodoroTimer from './components/PomodoroTimer';
import { TimerStateProvider } from './contexts/TimerContext';

export default function App() {
	return (
		<TimerStateProvider>
			<PomodoroTimer></PomodoroTimer>
		</TimerStateProvider>
	);
}
