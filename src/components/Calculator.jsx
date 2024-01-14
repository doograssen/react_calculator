import { useState } from 'react';
import styles from './calculator.module.css';

export const Calculator = (props) => {
	const OPERATIONS = ['+', '-', '*', '/'];
	let [result, setResult] = useState('');
  let [expression, setOperation] = useState({});

  const handleClick = (e) => {
    if (result.length >= 16) {
      setResult("!So Much Big Input");
      return;
    }
    if (result.charAt(0) === '0') {
      result = result.slice(1, result.length)
    }
		console.log(e.target);
    setResult(result.concat(e.target.textContent));
  }
  const operationChoose = (e) => {
    if (!expression.hasOwnProperty('operation')) {
      setResult('');
      setOperation({ ...expression, firstArgument: result, operation: e.target.textContent});
    }
    else {
      setResult('');
      setOperation({ ...expression, secondArgument: result, result: e.target.textContent});
    }
  }
  const clear = () => {
    setResult("");
  }
  const backSpace = () => {
    setResult(result.slice(0, result.length - 1))
  }
  const calculate = () => {
    try {
      result = eval(result).toString();
      if (result.includes('.')) {
        result =+ eval(result);
        result = result.toFixed(4).toString();
        setResult(result);
      } else {
        setResult(eval(result).toString());
      }
    } catch (err) {
      setResult("Error");
    }
  }
	return (
		<div className={styles.calc}>
			<div className={styles.screen}>
				<input type="text" value={result}  className={styles.field} />
			</div>
			<button onClick={calculate} className={styles.btn + ' ' + styles.operator}>=</button>
			<div className={styles.panel}>
				<div className={styles.numbers}>
					{[...Array(10).keys()].reverse().map((item) => (
						<button onClick={handleClick} className={styles.btn}>{item}</button>
					))}
					<button onClick={clear} className={styles.btn + ' ' + styles.operator}>C</button>
					<button onClick={backSpace} className={styles.btn + ' ' + styles.operator}>.</button>
				</div>
				<div className={styles.operatorTab}>
					{OPERATIONS.map((item) => (
						<button onClick={operationChoose} className={styles.btn + ' ' + styles.operator}>{item}</button>
					))}
				</div>
			</div>
		</div>
	);
};
