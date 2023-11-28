import { CalcButton } from './CalcButton';
import { useState } from 'react';
import './calculator.css';

export const Calculator = (props) => {
	const OPERATIONS = ['+', '-', '*', '/', '.'];
	let [result, setResult] = useState("");

  const handleClick = (e) => {
    if(result.length >=16){
      setResult("!So Much Big Input");
      return;
    }
    if (result.charAt(0) === '0') {
      result = result.slice(1, result.length)
    }
		console.log(e.target);
    setResult(result.concat(e.target.textContent));
  }

  const clear = () => {
    setResult("");
  }
  const backSpace = () => {
    setResult(result.slice(0, result.length - 1))
  }

  const calculate = () => {
    try {
      result=eval(result).toString()
      if(result.includes('.')){
        result =+ eval(result);
        result = result.toFixed(4).toString();
        setResult(result);
      }else{
        setResult(eval(result).toString());
      }

    } catch (err) {
      setResult("Error");
    }

  }
	return (
		<div className="calc">
			<div className="calc__input">
				<input type="text" value={result} />
			</div>
			<div className="calc__numbers">
				{[...Array(10).keys()].map((item) => (
					<button onClick={handleClick}>{item}</button>
				))}
			</div>
			<div className="calc__operations">
				<button onClick={clear} className="clear color">Clear</button>
        <button onClick={backSpace} className="backspace color">C</button>
				{OPERATIONS.map((item) => (
					<button onClick={handleClick}>{item}</button>
				))}
        <button onClick={calculate} className="equal color">=</button>
			</div>
		</div>
	);
};
