const charAllowed = ['(', ')', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '%'];

const calcInput = document.getElementById('calc-input');
const calcButtons = document.querySelectorAll('.charKey');
const clearButton = document.getElementById('clear');
const equalButton = document.getElementById('equal');
const resultEl = document.getElementById('result-input');
const copyButton = document.getElementById('copyToClipboard');

calcInput.focus();

calcInput.addEventListener('keydown', (e) => keyEntered(e));
clearButton.addEventListener('click', () => clearInput());
equalButton.addEventListener('click', () => calculate());
copyButton.addEventListener('click', () => copyResult())

calcButtons.forEach((el) => {
    el.addEventListener('click', (e) => {
        let value = e.currentTarget.dataset.value;
        calcInput.value += value;
    })
})


//PERMITE CARACTERES NO INPUT
const keyEntered = (e) => {
    e.preventDefault();
    if(charAllowed.includes(e.key)){
        calcInput.value += e.key;
        return
    }

    if(e.key === 'Backspace'){
        calcInput.value = calcInput.value.slice(0, -1);
    }

    if(e.key === 'Enter'){
        calculate();
    }
}

//LIMPA O INPUT
const clearInput = () => {
    calcInput.value = "";
    calcInput.focus();
}

//CALCULA A EXPRESSÃO
const calculate = () => {
    let expression = calcInput.value;
    let result = 0;

    if(expression != ""){
        result = eval(expression);
    }

    resultEl.value = result
    copyButton.classList.remove('copied');
    copyButton.innerText = 'Copy';
    clearInput();
}

//COPIA O RESULTADO
const copyResult = () => {
    navigator.clipboard.writeText(resultEl.value);
    copyButton.innerText = 'Copied!';
    copyButton.classList.add('copied');
}