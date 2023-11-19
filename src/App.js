import logo from './logo.svg';
import './App.css';
import { CalcButton } from './components/CalcButton';
import { useState } from 'react';

export const App = () => {
	const OPERATIONS = ['+', '-', '*', '÷'];
	const [value, setValue] = useState('0');
	const onClick = (value) => {
		return (e) => {
			setValue(value + e.target.value);
		};
	};
	return (
		<div className="App">
			<div className="calc">
				<div className="calc__input">
					<input type="text" value={value} onChange={value} />
				</div>
				<div className="calc__numbers">
					{[...Array(10).keys()].map((item) => (
						<CalcButton key={item} value={item} onClick={onClick(value)} />
					))}
				</div>
				<div className="calc__operations">
					{OPERATIONS.map((item) => (
						<CalcButton key={item} value={item} />
					))}
				</div>
			</div>
		</div>
	);
};
