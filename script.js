let all_budget = 0;
let income=0;
let expenses=0;
let addTransactionsBtn = document.querySelector('.checkButton');
let selectOperation = document.querySelector('.selectedPlusMinus');
let valueOperation = document.querySelector('#valueOperation');
let descriptionOperation = document.querySelector('#descriptionOperation');
let amount = document.querySelector('#amount');
let incomeValue = document.querySelector('#income_value');
let expensesValue = document.querySelector('#expences_value');
let expencesRate = document.querySelector('#expences_rate');
const formatter = new Intl.NumberFormat('en-US');
let procentOfIncome=0

console.log(incomeValue);
addTransactionsBtn.addEventListener('click', addTransactions);

function addTransactions() {
    if(selectOperation.value == 'Plus'){
        addIncome();
    }
    else if(selectOperation.value == 'Minus'){
        addExpenses();
        expencesRate.innerHTML = procentOfIncome + '%';
    }

    all_budget>0? amount.innerHTML = '+' + formatter.format(all_budget):  amount.innerHTML = formatter.format(all_budget);
    incomeValue.innerHTML = '+' + formatter.format(income);
    expensesValue.innerHTML = '-' + formatter.format(expenses);

    console.log(all_budget)
}

function addIncome() {
    all_budget += Number(valueOperation.value);
    income += Number(valueOperation.value);
}

function addExpenses() {
    all_budget -= Number(valueOperation.value);
    expenses += Number(valueOperation.value);
    procentOfIncome = Math.floor((expenses/income)*100);
}