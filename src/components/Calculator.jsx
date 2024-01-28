import { useState } from 'react';
import styles from './calculator.module.css';

export const Calculator = (props) => {
	const OPERATIONS = ['+', '-', '*', '/'];
  const NUMBER_PAD = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
	let [result, setResult] = useState('');
  let [fillState, setFillState] = useState(false);
  let [expression, setOperation] = useState({});

  const handleClick = (e) => {
    if (result.length >= 16 && !fillState) {
      setResult("!So Much Big Input");
      setFillState(true);
      return;
    }
    if (result.charAt(0) === '0') {
      result = result.slice(1, result.length)
    }
    if (!fillState) {
      setResult(result.concat(e.target.textContent));
    }
    else {
      setResult(e.target.textContent);
      setFillState(false);
    }
  };
  const calculate = (data) => {
    if (fillState) {
      return data;
    }
    let calculation = null;
    switch (data.operation) {
      case '+':
        calculation = (Number(data.firstArgument) + Number(result)).toString();
        break;
      case '-':
        calculation = (Number(data.firstArgument) - Number(result)).toString();
        break;
      case '/':
        calculation = (Number(data.firstArgument) / Number(result)).toString();
        break;
      case '*':
        calculation = (Number(data.firstArgument) * Number(result)).toString();
        break;
      default:
        calculation = 'Error';
        break;
    }
    setResult(calculation);
    setFillState(true);
    return {...data, firstArgument: calculation};
  };
  const setOperand = (evt) => {
    return (data) => {
      return {...data, operation: evt.target.textContent};
    }
  };
  const operationChoose = (e) => {
    if (!expression.hasOwnProperty('operation')) {
      setOperation({ ...expression, firstArgument: result, operation: e.target.textContent});
      setFillState(true);
    }
    else if (expression.operation !== e.target.textContent) {
      if (fillState) {
        setOperation(setOperand(e));
      }
      else {
        setOperation(calculate);
        setOperation(setOperand(e));
      }
    }
    else {
      setOperation(calculate);
    }
  };
  const evaluate = () => {
    setOperation(calculate);
  };
  const clear = () => {
    setResult("");
    setOperation({});
  }
  const backSpace = () => {
    if (!fillState) {
      setResult(result.slice(0, result.length - 1))
    }
  }
	return (
		<div className={styles.calc}>
			<div className={styles.screen}>
				<input type="text" value={result}  className={styles.field} />
			</div>
			<button onClick={evaluate} className={styles.btn + ' ' + styles.operator}>=</button>
			<div className={styles.panel}>
				<div className={styles.numbers}>
					{NUMBER_PAD.map((item) => (
						<button onClick={handleClick} className={styles.btn}>{item}</button>
					))}
					<button onClick={clear} className={styles.btn + ' ' + styles.operator}>C</button>
					<button onClick={backSpace} className={styles.btn + ' ' + styles.operator}> {'<'} </button>
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
