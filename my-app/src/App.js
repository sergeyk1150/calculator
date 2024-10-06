import './App.module.css';
import styles from './App.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');
	const [display, setDisplay] = useState('');
	const [equal, setEqual] = useState(false);
	const [string, setString] = useState('');

	const getOperand = (value) => {
		if (operator === '') {
			setString((prev) => prev + value);
			setOperand1((prev) => prev + value);
			setDisplay((prev) => prev + value);
		} else {
			setString((prev) => prev + value);
			setOperand2((prev) => prev + value);
			setDisplay((prev) => prev + value);
		}
	};

	const getResult = () => {
		if (operator === '+') {
			return Number(operand1) + Number(operand2);
		} else if (operator === '-') {
			return Number(operand1) - Number(operand2);
		}
	};

	const getAnswer = () => {
		if (operand1 && operand2) {
			setEqual(true);
			setDisplay(getResult());
			setOperand1(getResult());
			setOperand2('');
			setOperator('');
			setString((prev) => prev + `=`);
		}
	};

	const resetAll = () => {
		setString('');
		setOperand1('');
		setOperand2('');
		setOperator('');
		setDisplay('');
		setEqual(false);
	};
	const getOperator = (value) => {
		if (string.includes('=')) {
			setString(operand1);
		}
		if (operand2) {
			setOperand1(getResult());
			setOperand2('');
		}
		setEqual(false);
		setDisplay('');
		setOperator(value);
		if (value === '+') {
			setString((prev) => prev + '+');
		} else if (value === '-') {
			setString((prev) => prev + '-');
		}
	};

	const getClick = (id, value) => {
		if (id === 'plus' || id === 'minus') {
			return getOperator(value);
		} else if (id === 'reset') {
			return resetAll();
		} else if (id === 'equal') {
			return getAnswer();
		} else return getOperand(value);
	};

	return (
		<div className={styles.app}>
			<div className={styles['app-container']}>
				<h1 className={styles.title}>калькулятор</h1>
				<div className={styles.calculator}>
					<p
						className={
							!equal
								? styles.display
								: styles.display + ' ' + styles['display--orange']
						}
					>
						{display}
					</p>
					<span className={styles.string}>{string}</span>
					<div className={styles['calculator-buttons']}>
						{data.map(({ id, value }) => (
							<button
								key={id}
								id={id}
								className={styles.btn}
								onClick={() => getClick(id, value)}
							>
								{value}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
