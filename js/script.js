const numberBtns = document.querySelectorAll(".number");
const operandBtns = document.querySelectorAll(".operand");
const deleteBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");
const equalBtn = document.querySelector(".equal");
const prevOperand = document.querySelector(".prev-operand");
const output = document.querySelector(".output");

class Calculator {
    constructor(prevOperand, output) {
        this.prevOperand = prevOperand;
        this.output = output;
        this.clear();
    }
    clear() {
        this.currentDisplay = "";
        this.currentValue = 0;
        this.tempOutput = "";
        this.operand = "";
        this.prevOperand.innerText = "";
        this.output.innerText = "";
        this.token = 0;
        this.decimal = 0;
    }
    displayReset() {
        this.currentDisplay = "";
        this.currentValue = "";
        this.tempOutput = "";
        this.operand = "";
        this.token = 0;
    }

    del() {
        this.currentDisplay = this.currentDisplay.toString().slice(0, -1);
        // this.currentValue = Math.floor(this.currentValue / 10);
        this.currentValue = this.currentValue.toString().slice(0,-1);
    }

    handleValue(num) {
        if (this.token == 1) {
            this.displayReset();
        }
        if (num === ".") {
            this.decimal = 1;
        }
        this.currentValue += num.toString();
        // if(this.decimal==1){
        //     this.currentValue = this.currentValue * 10 + parseFloat(num);
        // }else{
        //     this.currentValue = this.currentValue * 10 + parseFloat(num);
        // }
        this.currentDisplay = this.currentDisplay + num.toString();
        console.log(this.currentDisplay);
    }

    handleOperator(operator) {
        if (this.operand !== "") {
            this.calculate();
            this.currentValue = 0;
        }
        if (this.token == 1) {
            this.displayReset();
        }
        this.operand = operator;
        this.currentDisplay = this.currentDisplay + operator.toString();
        this.tempOutput = this.tempOutput + parseFloat(this.currentValue);
        this.currentValue = "";
        console.log(this.operand);
    }

    handleEqual() {
        this.calculate();
        this.operand = "";
        this.token = 1;
    }

    calculate() {
        if (this.operand === "+") {
            this.tempOutput = this.tempOutput * 1 + parseFloat(this.currentValue);
        } else if (this.operand === "-") {
            this.tempOutput = this.tempOutput - parseFloat(this.currentValue);
        } else if (this.operand === "X") {
            this.tempOutput = this.tempOutput * parseFloat(this.currentValue);
        } else if (this.operand === "÷") {
            this.tempOutput = this.tempOutput / parseFloat(this.currentValue);
        } else if (this.operand === "%") {
            this.tempOutput = this.tempOutput % parseFloat(this.currentValue);
        } else {
            this.tempOutput = parseFloat(this.currentValue);
        }
    }

    update() {
        this.prevOperand.innerText = `${this.currentDisplay}`;
    }

    show() {
        this.output.innerText = `${this.tempOutput}`;
    }
}

const calculator = new Calculator(prevOperand, output);

numberBtns.forEach((e) => {
    e.addEventListener("click", () => {
        console.log(e.innerText);
        calculator.handleValue(e.innerText);
        calculator.update();
    });
});

operandBtns.forEach((e) => {
    e.addEventListener("click", () => {
        console.log(e.innerText);
        calculator.handleOperator(e.innerText);
        calculator.update();
    });
});

equalBtn.addEventListener("click", (e) => {
    calculator.handleEqual();
    calculator.show();
});

clearBtn.addEventListener("click", (e) => {
    calculator.clear();
    calculator.update();
});

deleteBtn.addEventListener("click", (e) => {
    calculator.del();
    calculator.update();
});
