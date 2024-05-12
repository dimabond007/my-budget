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
let arr_transaction = [];
flagLoad = true;

addTransactionsBtn.addEventListener('click', addTransactions);



loadData();

function addTransactions() {
    let id_transaction = generate_id();
    if (selectOperation.value == '+') {
        addIncome(id_transaction, descriptionOperation.value, valueOperation.value);
    }
    else if (selectOperation.value == '-') {
        addExpenses(id_transaction, descriptionOperation.value, valueOperation.value);

        expencesRate.innerHTML = procentOfIncome + '%';
    }

    all_budget > 0 ? amount.innerHTML = '+' + formatter.format(all_budget) : amount.innerHTML = formatter.format(all_budget);
    incomeValue.innerHTML = '+' + formatter.format(income);
    expensesValue.innerHTML = '-' + formatter.format(expenses);

    console.log(all_budget)
}

function generate_id(){
    let id = 0;

    while(true){
        let flag = true;
        for(let i=0; i<arr_transaction.length; i++){
            if(arr_transaction[i].id == id){
                flag = false;
                id++;
                break;
            }
        }
        if(flag){
            return id;
        }
    }
}


function addIncome(id, descVal, valOper) {
    if (!flagLoad)
        addToLocalStorage();

    console.log(arr_transaction);
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

    let btnDelete = document.createElement('button');
    btnDelete.className = 'btnDelete';
    btnDelete.innerHTML = 'X';
    btnDelete.dataset.id = id; 
    btnDelete.addEventListener('click', deleteOperations);
    new_row.appendChild(btnDelete);

    income_list.appendChild(new_row)
}

function addExpenses(id,descVal, valOper) {
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
    expensesMoney.innerHTML = valOper;
    expensesMoney.classList.add("money", "moneyExpenses");
    newRow.appendChild(expensesMoney);

    let precentageInARow = document.createElement("h3");
    precentageInARow.classList.add("precentage");
    precentageInARow.innerHTML = "15%";
    newRow.appendChild(precentageInARow);

    let btnDelete = document.createElement('button');
    btnDelete.className = 'btnDelete';
    btnDelete.innerHTML = 'X';
    btnDelete.dataset.id = id; 
    btnDelete.addEventListener('click', deleteOperations);
    newRow.appendChild(btnDelete);

    expenses_list.appendChild(newRow);
}

function deleteOperations(event) {
    
}

function addToLocalStorage() {
    console.log(arr_transaction);
    let id_oper = arr_transaction!=null ? arr_transaction.length + 1 : 0 ;
    let objTransaction = {
        'id': id_oper,
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
    arr_transaction = data ? data : [];

    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].operation == '+') {
                addIncome(data[i].id, data[i].description, data[i].value);

            }
            else if (data[i].operation == '-') {
                addExpenses(data[i].id, data[i].description, data[i].value);
            }
        }
        all_budget > 0? amount.innerHTML = '+' + formatter.format(all_budget) : amount.innerHTML = formatter.format(all_budget);
        incomeValue.innerHTML = '+' + formatter.format(income);
        expensesValue.innerHTML = '-' + formatter.format(expenses);
        procentOfIncome = Math.floor((expenses / income) * 100);
        expencesRate.innerHTML = procentOfIncome + '%';

        console.log(all_budget)
    }
    flagLoad = false;
}

