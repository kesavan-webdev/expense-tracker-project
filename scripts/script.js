"use strict";

//Get Elements
const form = document.getElementById("form");
const inputElOne = document.getElementById("transaction-name");
const inputElTwo = document.getElementById("credit-debit");
const transactionEL = document.querySelector(".transaction-history-container");
const currentBalance = document.getElementById("current-balance");
const income = document.getElementById("credit");
const expense = document.getElementById("debit");
// console.log(balanceEl, inputElOne, inputElTwo, creditEl, debitEl);

//Global Variables

//  functions

// Transactions function
function transactionsDetails(transaction) {
  // Transaction is an object,so transaction.amount is positive or negative values thats kept "+"" OR "-"
  const symbols = transaction.amount < 0 ? "-" : "+";
  // ELEMENTS Creations

  const divEl = document.createElement("div");
  divEl.classList.add(transaction.amount < 0 ? "expense" : "income");
  divEl.innerHTML = `<button class="btn-delete" onclick="removeTransaction(${transaction.id})">𐤕</button><span>${transaction.description}</span><span>${transaction.amount}</span> `;
  transactionEL.appendChild(divEl);
}

// Remove elements with ID
function removeTransaction(id) {
  // console.log(id);
  // confirm message in condition
  if (confirm("You want to delete the transaction")) {
    // using filter method
    // transaction id is not matched which we give the id ,except the id's bring back then update the transactions variable
    transactions = transactions.filter((transaction) => transaction.id != id);
    // call the function init so,page is reload the remaining data's after the removing data
    init();
    updateLocalStorage();
  } else {
    return;
  }
}

//Update Function
function update() {
  // TOTAL BALANCE UPDATE
  const amounts = transactions.map((transaction) => transaction.amount);
  // Reduce method using total balance amount,here 0 is initial value
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  // update the innerHTML
  currentBalance.innerHTML = `₹ ${total}`;
  // UPDATE CREDIT BALANCE
  // filter the positive values and reduce the single value to accumulate
  const credit = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  // update the innerHTML
  income.innerHTML = `₹ ${credit}`;
  // UPDATE DEBIT BALANCE
  const debit = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  // update the innerHTML
  expense.innerHTML = `₹ ${debit}`;
}

function addTransaction(e) {
  e.preventDefault();
  if (inputElOne.value.trim() == "" || inputElTwo.value.trim() == "") {
    alert("Invalid Data's");
  } else {
    const transaction = {
      id: uniqueId(),
      description: inputElOne.value,
      // default input is always STRING SO, convert into the NUMBER
      amount: Number(inputElTwo.value),
    };
    transactions.push(transaction);
    // 92 line is goes to transactionsDetails function
    transactionsDetails(transaction);
    inputElOne.value = "";
    inputElTwo.value = "";
    // update the new values
    update();
    // local storage called in a function
    updateLocalStorage();
  }
}
// unique id create
function uniqueId() {
  return Date.now();
}

//Event Listeners
form.addEventListener("submit", addTransaction);
window.addEventListener("load", function () {
  // init function called
  init();
});

// initialize function

function init() {
  transactionEL.innerHTML = "";
  transactions.forEach(transactionsDetails);
  // update function called
  update();
}

// Local Storage

function updateLocalStorage() {
  localStorage.setItem("transactionEL", JSON.stringify(transactions));
}
const localStorageItems = JSON.parse(localStorage.getItem("transactionEL"));
let transactions =
  localStorage.getItem("transactionEL") !== null ? localStorageItems : [];
