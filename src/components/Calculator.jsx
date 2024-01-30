import { useState } from 'react';
import styles from './calculator.module.css';

export const Calculator = (props) => {
	const OPERATIONS = ['+', '-', '*', '/'];
  const NUMBER_PAD = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
	const [result, setResult] = useState('');
  const [fillState, setFillState] = useState(false);
  const [expression, setOperation] = useState({});

  const handleClick = (value) => {
    if (result.length >= 16 && !fillState) {
      setResult("!So Much Big Input");
      setFillState(true);
      return;
    }
    if (result.charAt(0) === '0') {
      setResult(result.slice(1, result.length));
    }
    if (!fillState) {
      setResult(result.concat(value));
    }
    else {
      setResult(value);
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
  const setOperand = (value) => {
    return (data) => {
      return {...data, operation: value};
    }
  };
  const operationChoose = (value) => {
    if (!expression.hasOwnProperty('operation')) {
      setOperation({ ...expression, firstArgument: result, operation: value});
      setFillState(true);
    }
    else if (expression.operation !== value) {
      if (fillState) {
        setOperation(setOperand(value));
      }
      else {
        setOperation(calculate);
        setOperation(setOperand(value));
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
				<input type="text" value={result}  className={styles.field} readOnly/>
			</div>
			<button onClick={evaluate} className={styles.btn + ' ' + styles.operator}>=</button>
			<div className={styles.panel}>
				<div className={styles.numbers}>
					{NUMBER_PAD.map((item, index) => (
						<button onClick={() => handleClick(item)} className={styles.btn} key={index}>{item}</button>
					))}
					<button onClick={clear} className={styles.btn + ' ' + styles.operator}>C</button>
					<button onClick={backSpace} className={styles.btn + ' ' + styles.operator}> {'<'} </button>
				</div>
				<div className={styles.operatorTab}>
					{OPERATIONS.map((item, index) => (
						<button onClick={() => operationChoose(item)} className={styles.btn + ' ' + styles.operator} key={index}>{item}</button>
					))}
				</div>
			</div>
		</div>
	);
};
