let all_budget = 0;
let income = 0;
let expenses = 0;
let addTransactionsBtn = document.querySelector('.checkButton');
let secondSectionJS = document.querySelector(".secondSection")
let selectOperation = document.querySelector('.selectedPlusMinus');
let valueOperation = document.querySelector('#valueOperation');
let descriptionOperation = document.querySelector('#descriptionOperation');
let amount = document.querySelector('#amount');
let rowWrapperJS = document.querySelectorAll(".rowWrapper")
let incomeValue = document.querySelector('#income_value');
let expensesValue = document.querySelector('#expences_value');
let expencesRate = document.querySelector('#expences_rate');
const formatter = new Intl.NumberFormat('en-US');
let procentOfIncome = 0;
let income_list = document.querySelector('#income_list');
let expenses_list = document.querySelector('#expenses_list');
let arr_transaction = [];
let id_transaction = 0;
flagLoad = true;

addTransactionsBtn.addEventListener('click', addTransactions);
selectOperation.addEventListener("change", redGreenToggle)

loadData();
secondSectionJS.classList.add('greenSection');

function addTransactions() {
    id_transaction = generate_id();
    if (selectOperation.value == '+') {
        addIncome(id_transaction, descriptionOperation.value, valueOperation.value);
    } else if (selectOperation.value == '-') {
        addExpenses(id_transaction, descriptionOperation.value, valueOperation.value);
        expencesRate.innerHTML = procentOfIncome + '%';
    }

    updateTotal();
}

function updateTotal() {
    all_budget > 0 ? amount.innerHTML = '+' + formatter.format(all_budget) : amount.innerHTML = formatter.format(all_budget);
    incomeValue.innerHTML = '+' + formatter.format(income);
    expensesValue.innerHTML = '-' + formatter.format(expenses);
    procentOfIncome = Math.floor((expenses / income) * 100);
    expencesRate.innerHTML = procentOfIncome + '%';

}

function generate_id() {
    let id = 0;

    while (true) {
        let flag = true;
        for (let i = 0; i < arr_transaction.length; i++) {
            if (arr_transaction[i].id == id) {
                flag = false;
                id++;
                break;
            }
        }
        if (flag) {
            return id;
        }
    }
}

function addIncome(id, descVal, valOper) {
    if (!flagLoad)
        addToLocalStorage();

    all_budget += Number(valOper);
    income += Number(valOper);

    let new_row = document.createElement('div');
    new_row.className = 'rowWrapper';
    new_row.dataset.id = id;

    let h2desc = document.createElement('div');
    h2desc.innerHTML = descVal;
    h2desc.className = 'headerH2';
    new_row.appendChild(h2desc);

    let moneyincome = document.createElement('div');
    moneyincome.className = 'money moneyIncome';
    moneyincome.innerHTML = valOper + '$';
    new_row.appendChild(moneyincome);

    let btnDelete = document.createElement('a');
    btnDelete.className = 'btnDelete';
    btnDelete.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
    btnDelete.dataset.id = id;
    btnDelete.addEventListener('click', deleteOperations);
    new_row.appendChild(btnDelete);



    income_list.appendChild(new_row);

    if (!flagLoad)
        updatePercentages();
}

function addExpenses(id, descVal, valOper) {
    if (!flagLoad)
        addToLocalStorage();

    all_budget -= Number(valOper);
    expenses += Number(valOper);

    procentOfIncome = Math.floor((expenses / income) * 100);

    ////
    let newRow = document.createElement('div');
    newRow.classList.add("rowWrapper");
    newRow.dataset.id = id;

    let textRightDiv = document.createElement("div");
    textRightDiv.innerHTML = descVal;
    textRightDiv.classList.add("headerH2");
    newRow.appendChild(textRightDiv);

    let expensesMoney = document.createElement("h3");
    expensesMoney.innerHTML = `${valOper}$`;
    expensesMoney.classList.add("money", "moneyExpenses");
    newRow.appendChild(expensesMoney);

    let percentage = getPercentage(valOper);

    let precentageInARow = document.createElement("h3");
    precentageInARow.classList.add("precentage");
    precentageInARow.innerHTML = percentage + '%';
    newRow.appendChild(precentageInARow);

    let btnDelete = document.createElement('a');
    btnDelete.className = 'btnDelete ';
    btnDelete.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
    btnDelete.dataset.id = id;
    btnDelete.className = 'btnDelete';
    btnDelete.addEventListener('click', deleteOperations);
    newRow.appendChild(btnDelete);


    expenses_list.appendChild(newRow);
}

function deleteOperations(event) {
    let deleteId = this.dataset.id;
    let deleteRow = document.querySelector(`.rowWrapper[data-id="${deleteId}"]`)

    for (let i = 0; i < arr_transaction.length; i++) {
        if (arr_transaction[i].id == deleteId) {
            if (arr_transaction[i].operation == "+") {
                income -= arr_transaction[i].value;
                all_budget -= arr_transaction[i].value;
            }
            else {
                expenses -= arr_transaction[i].value;
                all_budget += arr_transaction[i].value;
            }
            arr_transaction.splice(i, 1);
            break;
        }
    }
    localStorage.setItem('transaction', JSON.stringify(arr_transaction));
    deleteRow.remove();
    updateTotal();
    updatePercentages()
}

function addToLocalStorage() {

    let id_oper = id_transaction;
    let objTransaction = {
        'id': id_oper,
        'operation': selectOperation.value,
        'value': valueOperation.value,
        'description': descriptionOperation.value
    }
    arr_transaction.push(objTransaction);

    localStorage.setItem('transaction', JSON.stringify(arr_transaction));
}

function getPercentage(pricePercent) {
    return Math.floor((100 * pricePercent) / income);
}
function updatePercentages() {
    expenses_list_childs = document.querySelectorAll('#expenses_list .rowWrapper')

    for (let i = 0; i < expenses_list_childs.length; i++) {

        expenses_list_childs[i].querySelector('.precentage').innerHTML = getPercentage(expenses_list_childs[i].querySelector('.moneyExpenses').innerHTML.replace(/\D/g, "")) + '%';
    }

}

function loadData() {
    flagLoad = true;
    let data = JSON.parse(localStorage.getItem('transaction'));
    arr_transaction = data ? data : [];

    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].operation == '+') {
                addIncome(data[i].id, data[i].description, data[i].value);

            } else if (data[i].operation == '-') {
                addExpenses(data[i].id, data[i].description, data[i].value);
            }
        }
        updateTotal();
    }
    flagLoad = false;
    updatePercentages();
}

function redGreenToggle() {
    secondSectionJS.classList.toggle("greenSection");
    secondSectionJS.classList.toggle("redSection")
}

