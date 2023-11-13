import logo from './logo.svg';
import './App.css';
import { CalcButton } from './components/CalcButton';

export const App = () => {
	return (
		<div className="App">
			<div className="calc">
				<CalcButton />
				<CalcButton />
				<CalcButton />
				<CalcButton />
				<CalcButton />
				<CalcButton />
				<CalcButton />
				<CalcButton />
				<CalcButton />
			</div>
		</div>
	);
};
