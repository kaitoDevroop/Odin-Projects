const display = document.querySelector('#containerScreen');

const calculator = {
  displayValue: '0',
  displayResult: '0',
  firstOperand:  null,
  waitingForSecondOperand: false,
  operator: null,
};

function updateDisplay() {
  display.textContent = calculator.displayValue;
}

function inputDigit(digit) {
  const { displayValue, displayResult, waitingForSecondOperand } = calculator;
  calculator.displayValue = displayValue === '0' ? digit : displayValue + digit

if (waitingForSecondOperand === true) {
  calculator.displayResult = digit;
  calculator.waitingForSecondOperand = false
} else {
  calculator.displayResult = displayResult === '0' ? digit : displayResult + digit
}

 
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
  	calculator.displayValue = '0.'
    calculator.waitingForSecondOperand = false;
    return
  }

  if (!calculator.displayResult.includes(dot) && !display.textContent.includes(dot)) {
    calculator.displayValue += dot;
    calculator.displayResult += dot;
  }
}

function handleOperator(nextOperator) {

  const { firstOperand, displayValue, operator, displayResult } = calculator

  const inputValue = parseFloat(displayResult)

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue; 
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayResult = String(result);
    calculator.firstOperand = result;
    
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

function displayOperator(operator) {
    calculator.displayValue += operator
}

function calculateOperator(calOperator) {

  const {displayValue} = calculator


  if (!displayValue.includes('+') && 
      !displayValue.includes('-') && 
      !displayValue.includes('*') && 
      !displayValue.includes('/')){
        return;
  } else {
    handleOperator();
    calculator.displayValue = calculator.displayResult;
  }
} 

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  } 

  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.displayResult = '0'
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}




export {calculator, updateDisplay, displayOperator, calculateOperator, inputDigit, inputDecimal, handleOperator, resetCalculator}