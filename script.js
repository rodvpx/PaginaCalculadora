// Obtém o elemento de exibição da calculadora
let display = document.getElementById('display');
// Obtém o elemento de histórico da calculadora
let historyDisplay = document.getElementById('history');
// Variável para armazenar a operação atual
let currentOperation = null;
// Variável para armazenar o operando anterior
let previousOperand = '';
// Variável para armazenar o operando atual
let currentOperand = '';
// Variável para armazenar o histórico de operações
let operationHistory = '';

// Adiciona um evento para capturar as teclas pressionadas
document.addEventListener('keydown', handleKeyPress);

// Função para adicionar um número ao operando atual
function appendNumber(number) {
    if (currentOperand === '0') {
        // Substitui o valor se o operando atual for '0'
        currentOperand = number;
    } else {
        // Adiciona o número ao operando atual
        currentOperand += number;
    }
    // Atualiza a exibição
    updateDisplay();
}

// Função para definir a operação a ser realizada
function setOperation(operation) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        // Calcula se já houver um operando anterior
        calculate();
    }
    // Define a operação atual
    currentOperation = operation;
    // Define o operando anterior como o atual
    previousOperand = currentOperand;
    // Reseta o operando atual
    currentOperand = '';
    // Adiciona a operação ao histórico
    operationHistory += `${previousOperand} ${operation} `;
    // Atualiza o histórico
    updateHistory();
}

// Função para calcular a operação
function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (currentOperation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    // Armazena o resultado no operando atual
    currentOperand = computation;
    // Reseta a operação atual
    currentOperation = null;
    // Reseta o operando anterior
    previousOperand = '';
    // Adiciona o cálculo ao histórico
    operationHistory += `${current} = ${computation}\n`;
    // Atualiza o histórico
    updateHistory();
    // Atualiza a exibição
    updateDisplay();
}

// Função para limpar a exibição e variáveis
function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    currentOperation = null;
    operationHistory = '';
    updateHistory();
    updateDisplay();
}

// Função para atualizar a exibição
function updateDisplay() {
    // Exibe o operando atual ou '0' se estiver vazio
    display.innerText = currentOperand || '0';
}

// Função para atualizar o histórico
function updateHistory() {
    // Exibe o histórico de operações
    historyDisplay.innerText = operationHistory;
}

// Função para lidar com pressionamento de teclas
function handleKeyPress(event) {
    const key = event.key;
    // Adiciona o número se a tecla for um dígito
    if (/[0-9]/.test(key)) {
        appendNumber(key);
    }
    // Calcula se a tecla for 'Enter'
    if (key === 'Enter') {
        calculate();
    }
    // Limpa a exibição se a tecla for 'Escape'
    if (key === 'Escape') {
        clearDisplay();
    }
    // Define a operação se a tecla for um operador
    if (['+', '-', '*', '/'].includes(key)) {
        setOperation(key);
    }
}
