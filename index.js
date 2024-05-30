

let options = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '/', '*', '^', '%', 'AC', 'Clr', 'Del', '='];

let buttons = document.getElementById('buttons');
let display = document.getElementById('display');

let x = 0, y = 0, sign = '+', xFilled = false;

function isNumber(val) {
    for (let i = 0; i < 10; i++) {
        if (options[i] === val) {
            return true
        }
    }
    return false;
}

function isOperator(val) {
    for (let i = 10; i < 16; i++) {
        if (options[i] === val) return true;
    }
    return false
}

function getVal(val) {
    return Number(val)
}

function getCalculated(x, y, val) {
    if (val === '+') return x + y;
    else if (val === '-') return x - y;
    else if (val === '/') return x / y;
    else if (val === '*') return x * y;
    else if (val === '%') return x % y;
    else return Math.pow(x, y)
}

function assignValue(val) {
    if (xFilled) {
        if (isNumber(val)) {
            let currNum = getVal(val)
            y *= 10;
            y += currNum;
        } else if (isOperator(val)) {
            sign = val;
            xFilled = true;
            y = 0
            display.innerText = val;
            return;
        } else {
            if (val === 'AC') {
                x = 0;
                y = 0;
                xFilled = false;
            } else if (val == 'Del') {
                y = Math.floor(y / 10);
            } else if (val == 'Clr') {
                y = 0;
            } else {
                x = getCalculated(x, y, sign)
                xFilled = false;
                y = 0;
            }
        }
        if (xFilled) display.innerText = y;
        else display.innerText = x;
    } else {
        if (isNumber(val)) {
            let currNum = getVal(val)
            x *= 10;
            x += currNum;

        } else if (isOperator(val)) {
            sign = val;
            xFilled = true;
            y = 0
            display.innerText = val;
            return;
        } else {
            if (val === 'AC') {
                x = 0;
                y = 0;
                xFilled = false;
            } else if (val == 'Del') {
                x = Math.floor(x / 10);
            } else if (val == 'Clr') {
                x = 0;
            } else {
                x = getCalculated(x, y, sign)
                xFilled = false;
                y = 0;
            }
        }
    }
    if (xFilled) display.innerText = y;
    else display.innerText = x;
}

buttons.addEventListener("click", (e) => {
    assignValue(e.target.id);
})

for (let i = 0; i < options.length; i++) {
    var newButton = document.createElement("button");
    newButton.id = options[i];

    if (i < 10) newButton.className = "btn btn-primary";
    else if (i < 16) newButton.className = "btn btn-info";
    else newButton.className = "btn btn-danger";

    newButton.innerText = options[i];
    buttons.appendChild(newButton);
}

