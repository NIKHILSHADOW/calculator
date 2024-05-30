

let options = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', '%', '^', 'AC', 'DEL', 'CLR', '=']

let buttons = document.querySelector(".buttons");

for( let i=0; i < options.length; i++) {
    let currButton = document.createElement("button");
    currButton.id=options[i];
    currButton.innerText=options[i];
    buttons.appendChild(currButton);
}

let x = 0, y = 0, xFilled = false, sign='+', isCharSign = false;

function calc() {
    switch(sign) {
        case '+' :
            return x+y;
        case '-':
            return x-y;
        case '*' :
            return x*y;
        case '/':
            return x/y;
        case '^':
            return Math.pow(x,y);
        case '%' :
            return x%y;
    }
}

function assign(z) {
    isCharSign = false;
    if(z ==='AC'){
        x=0;
        y=0;
        xFilled=false;
    }else if(z === 'DEL'){
        if(xFilled){
            y/=10;
            y = parseInt(y);
        }else{
            x/=10;
            x = parseInt(x);
        }
    }else if(z === 'CLR'){
        if(xFilled){
            y=0;
        }else{
            x=0;
        }
    }else if(z === '='){
        x = calc(x, y, sign);
        xFilled=false;
        y=0;
    }else{
        for(let i=10;i<16;i++){
            if(z === options[i]){
                xFilled=true;
                sign=z;
                isCharSign = true
            }
        }
        for(let i=0;i<10;i++){
            if(z === options[i]){
                if(xFilled){
                    y*=10;
                    y+=parseInt(z);
                }else{
                    x*=10;
                    x+=parseInt(z);
                }
            }
        }
    }
    if(isCharSign){
        answer.innerText=sign
    }else{
        answer.innerText=(xFilled)?y:x;
    }
    
}

buttons.addEventListener("click",(e) => {
    assign(e.target.id)
})

