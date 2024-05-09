let all_budget = 0;
let income = 0;
let expenses = 0;
let addTransactionsBtn = document.querySelector('.checkButton');
let selectOperation = document.querySelector('.selectedPlusMinus');
let valueOperation = document.querySelector('#valueOperation');
let descriptionOperation = document.querySelector('#descriptionOperation');
let amount = document.querySelector('#amount');
let incomeValue = document.querySelector('#income_value');
let expensesValue = document.querySelector('#expences_value');
let expencesRate = document.querySelector('#expences_rate');
const formatter = new Intl.NumberFormat('en-US');
let procentOfIncome = 0;
let income_list = document.querySelector('#income_list');
let expenses_list = document.querySelector('#expenses_list');

addTransactionsBtn.addEventListener('click', addTransactions);



function addTransactions() {
    if (selectOperation.value == 'Plus') {
        addIncome();
    }
    else if (selectOperation.value == 'Minus') {
        addExpenses();

        expencesRate.innerHTML = procentOfIncome + '%';
    }

    all_budget > 0 ? amount.innerHTML = '+' + formatter.format(all_budget) : amount.innerHTML = formatter.format(all_budget);
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
    procentOfIncome = Math.floor((expenses / income) * 100);

    ////
    let newExpensesRow = document.createElement('div');
    newExpensesRow.classList.add("rowWrapper");
    expenses_list.appendChild(newExpensesRow);

    let textRightDiv = document.createElement("div");
    textRightDiv.innerHTML = descriptionOperation.value;
    textRightDiv.classList.add("headerH2");
    newExpensesRow.appendChild(textRightDiv);

    let expensesMoney = document.createElement("h3");
    expensesMoney.innerHTML = valueOperation.value;
    expensesMoney.classList.add("money", "moneyExpenses");
    newExpensesRow.appendChild(expensesMoney);

    let precentageInARow = document.createElement("h3");
    precentageInARow.classList.add("precentage");
    precentageInARow.innerHTML = "15%";
    newExpensesRow.appendChild(precentageInARow);


}