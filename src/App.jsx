import React from 'react';
import './App.css';
import Button from './components/Button';
import DigitDisplay from './components/DigitDisplay';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startTime: new Date(),
			currentTime: new Date(),
			timerActive: false,
			timerId: null,
			duration: 60,
		};
		this.handleClickPlay = this.handleClickPlay.bind(this);
		// this.handleClickPlay = this.handleClickPlay.bind(this);
		// this.handleClickPlay = this.handleClickPlay.bind(this);
	}

	componentDidMount() {
		console.log('mounting app');
	}

	componentWillUnmount() {
		console.info('unmounting app');
		clearInterval(this.state.timerId);
	}

	componentDidUpdate() {
		console.log(`update: ${this.state.currentTime}`);
	}

	tick() {
		this.setState({
			currentTime: new Date(),
		});
		console.log(
			` handleClickPlay startTime: ${this.state.startTime} currentTime: ${this.state.currentTime}`
		);
	}

	getMinutesRemaining() {
		if (this.state.duration < 60) {
			return 0;
		}
	}

	getSecondsRemaining() {}

	handleClickPlay(e) {
		this.setState({ timerActive: true });
		this.setState({ timerId: setInterval(() => this.tick(), 1000) });
		this.setState({ startTime: new Date() });
		console.log(` handleClickPlay`);
	}

	handleClickPause(e) {
		this.setState({ timerActive: false });
		clearInterval(this.state.timerId);
		console.log(` handleClickPause`);
	}

	handleClickRestart(e) {
		this.setState({
			timerActive: false,
			startTime: new Date(),
			currentTime: new Date(),
		});
		clearInterval(this.state.timerId);
		console.log(` handleClickRestart`);
	}

	render() {
		// console.log(`${this.state.timerActive}`);
		const difference = this.state.currentTime - this.state.startTime;
		return (
			<div className='pomodoro-container'>
				<h1>Pomodoro Timer</h1>

				<DigitDisplay time={difference}></DigitDisplay>
				<Button
					children='play'
					handleClick={this.handleClickPlay}
					toggled={this.state.timerActive}
				></Button>
				<Button
					children='pause'
					handleClick={() => this.handleClickPause()}
					toggled={!this.state.timerActive}
				></Button>
				<Button
					children='restart'
					handleClick={() => this.handleClickRestart()}
				></Button>
			</div>
		);
	}
}

export default App;
