const buttons = document.querySelector('.container-btns');
const display = document.querySelector('#containerScreen');

import {calculator, updateDisplay, displayOperator, calculateOperator, inputDigit, inputDecimal, handleOperator, resetCalculator } from "./keyfunctions.js"; 

buttons.addEventListener('click', e => {
  
  const {target} = e;
  const {value} = target;

  if (!target.matches('button')) {
    return;
  }

  switch (value) {
    case '+':
    case '*':
    case '-':
    case '/':
      handleOperator(value);
      displayOperator(value)
      console.log(calculator);
      break;
    case '=':
      calculateOperator(value)
      console.log(calculator);
      break
    case '.':
      inputDecimal(value);
      console.log(calculator);
      break;
    case 'allClear':
      resetCalculator();
      console.log(calculator);
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
        console.log(calculator)
      }
  }

updateDisplay();


})


