let operand1 = '0';
let operator = '';
let operand2 = '0';
let nextOperandFlag = false;

document.addEventListener("DOMContentLoaded", () => {
    const numButtons = document.querySelectorAll(".num-btn");
    numButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            handleDigitInput(event.currentTarget.dataset.num);
        });
    });

    const operatorButtons = document.querySelectorAll(".oper-btn");
    operatorButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            handleOperatorInput(event.currentTarget.dataset.oper);
        });
    });

    document.getElementById("equal-btn").addEventListener("click", handleEqualInput);
});

function handleDigitInput(digit) {
    if(!nextOperandFlag) {
        if(operand1 === '0') {
            operand1 = digit + '';
        } else {
            operand1 += digit + '';
        }
        document.getElementById("num-display").innerText = operand1;
    } else {
        if(operand2 === '0') {
            operand2 = digit + '';
        } else {
            operand2 += digit + '';
        }
        document.getElementById("num-display").innerText = operand2;
    }
}

function handleOperatorInput(newOperator) {
    if(operator != '') {
        handleEqualInput();
    }
    operator = newOperator;
    nextOperandFlag = true;
}

function handleEqualInput() {
    if(nextOperandFlag) {
        const result = operate(operator, parseInt(operand1), parseInt(operand2));
        operand1 = result + '';
        operand2 = '0';
        document.getElementById("num-display").innerText = result; 
    }
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return 0;
    }
}