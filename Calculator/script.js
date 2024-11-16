let container = [];
let number = "";

const buttons = () => {
    const inputContaiener = document.querySelector('.display');

    document.querySelectorAll('[data-btn]').forEach(buttonNumber => {
        buttonNumber.addEventListener('click', () => {writeNumber(buttonNumber, inputContaiener)})
    })

    // * Operators Buttons;
    document.querySelectorAll('[data-btn-operator]').forEach(operator => {
        operator.addEventListener('click', () => {
            if(number.length > 0) {
                container.push(number)
                container.push(operator.value)
                number = "";
                inputContaiener.value = inputContaiener.value.concat(operator.value);
                console.log(number)
                console.log(container)
            } 
            if(container.length === 1) {
                container.push(operator.value)
                inputContaiener.value = inputContaiener.value.concat(operator.value);
                console.log('second')
                console.log(number)
                console.log(container)
            }
        })
    });

    // * Result Button
    document.querySelector('[data-btn-result]').addEventListener('click', () => {
        result(container, true, inputContaiener)})
    // * Clear buttons
    document.querySelector('[data-btn-clear]').addEventListener('click', (e) => {clear(e.target.value, inputContaiener)})
    document.querySelector('[data-btn-clearAll]').addEventListener('click', (e) => {clear(e.target.value, inputContaiener)})
}


const writeNumber = (input, display) => {
    if(number.length < 12) {
        number = number + input.value;
        addNumber = display.value.concat(input.value);
        display.value = display.value.concat(input.value);
        console.log(number)
    }
    if(number.length >= 16) {
        input.removeEventListener('click', () => {})
    }  
}

const clear = (btn, display) => {
    if(btn == "C" && display.value != 0) {
        display.value = display.value.slice(0, -1)
        number = number.slice(0, -1)
        container.pop()
        return display.value;
    }
    if(btn == "AC") {
        number = ""
        container = []
        return display.value = ""
    }
}

const result = (operation, pushLastNumber, display) => {
    // * Operation will be equal to the container[]

    if(pushLastNumber && operation.length > 1) {
        operation.push(number)
        number = "";
        console.log("1st if")
    }

    if(number.length == 0 && operation[operation.length -1] == "") {
        operation = [];
        display.value = "Error"
        console.log(operation)
    }
    if(operation.includes("*")) {
        makeOperation(operation, "*");
    }
    if(operation.includes("/")) {
        makeOperation(operation, "/")
    }
    if(operation.includes("+")) {
        makeOperation(operation, "+")
    }
    if(operation.includes("-")) {
        makeOperation(operation, "-")
    }
    if(operation.length == 1) {
        display.value = operation[0];    }

    function makeOperation(op, operator) {
        let valueOne;
        let valueTwo;
        let resultValue;
        valueOne = parseFloat(op[op.indexOf(operator) - 1])
        valueTwo = parseFloat(op[op.indexOf(operator) + 1])
        
        switch (operator) {
            case "*":
                resultValue = valueOne * valueTwo;
                break;
            case "/":
                resultValue = Math.floor(valueOne / valueTwo);
                break;
            case "+":
                resultValue = valueOne + valueTwo;
                break;
            case "-":
                resultValue = valueOne - valueTwo;
                break;
            default:
                console.log('helo')
                break;
        }

        op.splice((op.indexOf(operator)-1), 3, resultValue.toString())
        // op.splice((op.indexOf(operator)-1), 3)
        console.log(op)
        return result(op, false, display)
    }
}

buttons();


