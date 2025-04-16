let operand1 = '0';
let operator = '';
let operand2 = '0';


//Modes:
//  1 -> Operand 1 entering mode
//  2 -> Operator entering mode
//  3 -> operand 2 entering mode
let mode = 1;


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('num-display').innerText = operand1;

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
    document.getElementById("clear-btn").addEventListener("click", handleClearInput);

    document.querySelectorAll("button").forEach((element) => {
        element.addEventListener("click" , () => {
            element.classList.add("light-gray-btn");
            setTimeout(() => {
                element.classList.remove("light-gray-btn");
            }, 100);
        });
    });

    document.body.addEventListener("keyup", (event) => {
        handleKeyInput(event.key);
    });

    document.getElementById("decimal-btn").addEventListener("click", handleDecimalInput);
});


//DOM manipulation functions - START

function handleDecimalInput() {
    if(mode === 1) {
        if(!operand1.includes(".")) {
            operand1 += ".";
        }
        document.getElementById("num-display").innerText = operand1;
    }
    if(mode === 3) {
        if(!operand2.includes(".")) {
            operand2 += ".";
        }
        document.getElementById("num-display").innerText = operand2;
    }
    
}

function handleKeyInput(key) {
    const keyToButtonIdMap = {
        0: "zero-btn",
        1: "one-btn",
        2: "two-btn",
        3: "three-btn",
        4: "four-btn",
        5: "five-btn",
        6: "six-btn",
        7: "seven-btn",
        8: "eight-btn",
        9: "nine-btn",
        "c": "clear-btn",
        "=": "equal-btn",
        "Enter": "equal-btn",
        "+": "add-btn",
        "-": "minus-btn",
        "*": "multiply-btn",
        "/": "divide-btn",
        ".": "decimal-btn"
    };

    if(Object.keys(keyToButtonIdMap).includes(key)) {
        const clickEvent = new Event("click");
        const btnId = keyToButtonIdMap[key];
        document.getElementById(btnId).dispatchEvent(clickEvent);
    }
}

function handleDigitInput(digit) {
    if(mode === 1) {
        if(operand1 === '0') {
            operand1 = digit + '';
        } else {
            operand1 += digit + '';
        }
        document.getElementById("num-display").innerText = operand1;
    } 

    if(mode === 2) {
        mode = 3;
    } 

    if (mode === 3) {
        if(operand2 === '0') {
            operand2 = digit + '';
        } else {
            operand2 += digit + '';
        }
        document.getElementById("num-display").innerText = operand2;
    }
}

function handleOperatorInput(newOperator) {
    // if(operator != '') {
    //     handleEqualInput();
    // }
    if(mode === 1) mode = 2;
    if(mode === 2) {
        operator = newOperator;
    }
    if(mode === 3) {
        handleEqualInput();
        operator = newOperator;
    }
    
}

function handleEqualInput() {
    if(mode === 3) {
        //Divide by zero
        if(operator === '/' && operand2 === '0') {
            document.getElementById('num-display').innerText = "Nice try bro";
            setTimeout(() => {
                document.getElementById("num-display").innerText = operand2;
            }, 1000)
        } else {
            mode = 2;
            const result = operate(operator, parseFloat(operand1), parseFloat(operand2));
            operand1 = result + '';
            operand2 = '0';
            document.getElementById("num-display").innerText = result;
        } 
    }

    
}

//Resets the page to as if they just started
function handleClearInput() {
    operand1 = '0';
    operator = '';
    operand2 = '0';
    mode = 1;
    document.getElementById('num-display').innerText = operand1;
}

////DOM manipulation functions - END


//Mathematical functions - START

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

//Mathematical functions - END