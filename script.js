let all_budget = 0;
let income = 0;
let expenses = 0;
let addTransactionsBtn = document.querySelector('.checkButton');
let secondSectionJS = document.querySelector(".secondSection")
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
let arr_transaction = [];
flagLoad = true;



addTransactionsBtn.addEventListener('click', addTransactions);
selectOperation.addEventListener("change", redGreenToggle)

secondSectionJS.classList.add('greenSection');

function addTransactions() {
    if (selectOperation.value == '+') {
        addIncome(descriptionOperation.value, valueOperation.value);
    }
    else if (selectOperation.value == '-') {
        addExpenses(descriptionOperation.value, valueOperation.value);

        expencesRate.innerHTML = procentOfIncome + '%';
    }

    all_budget > 0 ? amount.innerHTML = '+' + formatter.format(all_budget) : amount.innerHTML = formatter.format(all_budget);
    incomeValue.innerHTML = '+' + formatter.format(income);
    expensesValue.innerHTML = '-' + formatter.format(expenses);

    console.log(all_budget)
}

function addIncome(descVal, valOper) {
    if (!flagLoad)
        addToLocalStorage();

    console.log(arr_transaction);
    all_budget += Number(valOper);
    income += Number(valOper);

    let new_row = document.createElement('div');
    new_row.className = 'rowWrapper';

    let h2desc = document.createElement('div');
    h2desc.innerHTML = descVal;
    h2desc.className = 'headerH2';
    new_row.appendChild(h2desc);

    let moneyincome = document.createElement('div');
    moneyincome.className = 'money moneyIncome';
    moneyincome.innerHTML = valOper + '$';
    new_row.appendChild(moneyincome);

    income_list.appendChild(new_row)
}

function addExpenses(descVal, valOper) {
    if (!flagLoad)
        addToLocalStorage();

    all_budget -= Number(valOper);
    expenses += Number(valOper);
    procentOfIncome = Math.floor((expenses / income) * 100);

    ////
    let newExpensesRow = document.createElement('div');
    newExpensesRow.classList.add("rowWrapper");
    expenses_list.appendChild(newExpensesRow);

    let textRightDiv = document.createElement("div");
    textRightDiv.innerHTML = descVal;
    textRightDiv.classList.add("headerH2");
    newExpensesRow.appendChild(textRightDiv);

    let expensesMoney = document.createElement("h3");
    expensesMoney.innerHTML = `${valOper} $`;
    expensesMoney.classList.add("money", "moneyExpenses");
    newExpensesRow.appendChild(expensesMoney);

    let precentageInARow = document.createElement("h3");
    precentageInARow.classList.add("precentage");
    precentageInARow.innerHTML = "15%";
    newExpensesRow.appendChild(precentageInARow);


}

function addToLocalStorage() {
    let objTransaction = {
        'operation': selectOperation.value,
        'value': valueOperation.value,
        'description': descriptionOperation.value
    }
    arr_transaction.push(objTransaction);

    localStorage.setItem('transaction', JSON.stringify(arr_transaction));
}

function loadData() {
    flagLoad = true;
    let data = JSON.parse(localStorage.getItem('transaction'));
    arr_transaction = data;
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].operation == '+') {
                addIncome(data[i].description, data[i].value);

            }
            else if (data[i].operation == '-') {
                addExpenses(data[i].description, data[i].value);
            }
        }
    }
    flagLoad = false;
}

loadData();

function redGreenToggle() {
    secondSectionJS.classList.toggle("greenSection");
    secondSectionJS.classList.toggle("redSection")


}
