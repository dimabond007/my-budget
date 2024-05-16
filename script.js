let all_budget = 0, income = 0, expenses = 0, procentOfIncome = 0, id_transaction = 0, flagLoad = true, arr_transaction = [];
const addTransactionsBtn = document.querySelector('.checkButton'),
      secondSectionJS = document.querySelector(".secondSection"),
      selectOperation = document.querySelector('.selectedPlusMinus'),
      valueOperation = document.querySelector('#valueOperation'),
      descriptionOperation = document.querySelector('#descriptionOperation'),
      amount = document.querySelector('#amount'),
      incomeValue = document.querySelector('#income_value'),
      expensesValue = document.querySelector('#expences_value'),
      expencesRate = document.querySelector('#expences_rate'),
      income_list = document.querySelector('#income_list'),
      expenses_list = document.querySelector('#expenses_list'),
      available_budget = document.querySelector('.available_budget'),
      formatter = new Intl.NumberFormat('en-US'),
      months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

addTransactionsBtn.addEventListener('click', addTransactions);
selectOperation.addEventListener("change", redGreenToggle);

startApp();
secondSectionJS.classList.add('greenSection');

function startApp() {
    let datenow = new Date();
    available_budget.innerHTML = `Available Budget in ${months[datenow.getMonth()]} ${datenow.getFullYear()}`;
    loadData();
}

function addTransactions() {
    if (descriptionOperation.value) {
        id_transaction = generate_id();
        selectOperation.value == '+' ? addIncome(id_transaction, descriptionOperation.value, valueOperation.value) : addExpenses(id_transaction, descriptionOperation.value, valueOperation.value);
        updateTotal();
    }
}

function updateTotal() {
    amount.innerHTML = all_budget > 0 ? `+${formatter.format(all_budget)}` : formatter.format(all_budget);
    incomeValue.innerHTML = `+${formatter.format(income)}`;
    expensesValue.innerHTML = `-${formatter.format(expenses)}`;
    procentOfIncome = income == 0 ? 0 : Math.floor((expenses / income) * 100);
    expencesRate.innerHTML = `${procentOfIncome}%`;
}

function generate_id() {
    let id = 0;
    while (arr_transaction.some(transaction => transaction.id == id)) id++;
    return id;
}

function createRow(id, descVal, valOper, type) {
    let newRow = document.createElement('div');
    newRow.className = 'rowWrapper';
    newRow.dataset.id = id;

    let descDiv = document.createElement('div');
    descDiv.className = 'headerH2';
    descDiv.innerHTML = descVal;
    newRow.appendChild(descDiv);

    let moneyDiv = document.createElement('div');
    moneyDiv.className = `money money${type}`;
    moneyDiv.innerHTML = formatter.format(valOper);
    newRow.appendChild(moneyDiv);

    if (type === 'Expenses') {
        let precentageDiv = document.createElement("h3");
        precentageDiv.className = 'precentage';
        precentageDiv.innerHTML = `${getPercentage(valOper)}%`;
        newRow.appendChild(precentageDiv);
    }

    let btnDelete = document.createElement('a');
    btnDelete.className = `btnDelete ${type === 'Income' ? 'green' : 'red'}`;
    btnDelete.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
    btnDelete.dataset.id = id;
    btnDelete.addEventListener('click', deleteOperations);
    newRow.appendChild(btnDelete);

    (type === 'Income' ? income_list : expenses_list).appendChild(newRow);
}

function addIncome(id, descVal, valOper) {
    if (!flagLoad) addToLocalStorage();
    all_budget += Number(valOper);
    income += Number(valOper);
    createRow(id, descVal, valOper, 'Income');
    if (!flagLoad) updatePercentages();
}

function addExpenses(id, descVal, valOper) {
    if (!flagLoad) addToLocalStorage();
    all_budget -= Number(valOper);
    expenses += Number(valOper);
    createRow(id, descVal, valOper, 'Expenses');
}

function deleteOperations(event) {
    let deleteId = this.dataset.id;
    let deleteRow = document.querySelector(`.rowWrapper[data-id="${deleteId}"]`);

    arr_transaction.forEach((transaction, i) => {
        if (transaction.id == deleteId) {
            let valoftrans = Number(transaction.value);
            transaction.operation == "+" ? (income -= valoftrans, all_budget -= valoftrans) : (expenses -= valoftrans, all_budget += valoftrans);
            arr_transaction.splice(i, 1);
        }
    });
    localStorage.setItem('transaction', JSON.stringify(arr_transaction));
    deleteRow.remove();
    updateTotal();
    updatePercentages();
}

function addToLocalStorage() {
    arr_transaction.push({ id: id_transaction, operation: selectOperation.value, value: valueOperation.value, description: descriptionOperation.value });
    localStorage.setItem('transaction', JSON.stringify(arr_transaction));
}

function getPercentage(pricePercent) {
    return income == 0 ? 0 : Math.floor((100 * pricePercent) / income);
}

function updatePercentages() {
    document.querySelectorAll('#expenses_list .rowWrapper').forEach(row => {
        row.querySelector('.precentage').innerHTML = `${getPercentage(row.querySelector('.moneyExpenses').innerHTML.replace(/\D/g, ""))}%`;
    });
}

function loadData() {
    flagLoad = true;
    let data = JSON.parse(localStorage.getItem('transaction')) || [];
    arr_transaction = data;

    data.forEach(transaction => {
        transaction.operation == '+' ? addIncome(transaction.id, transaction.description, transaction.value) : addExpenses(transaction.id, transaction.description, transaction.value);
    });

    updateTotal();
    flagLoad = false;
    updatePercentages();
}

function redGreenToggle() {
    secondSectionJS.classList.toggle("greenSection");
    secondSectionJS.classList.toggle("redSection");
}