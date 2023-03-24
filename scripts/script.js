// elements

const form = document.getElementById("form");
const inputElOne = document.getElementById("transaction-name");
const inputElTwo = document.getElementById("credit-debit");
const transactionEL = document.querySelector(".transaction-history-container");
const currentBalance = document.getElementById("current-balance");
const income = document.getElementById("credit");
const expense = document.getElementById("debit");
// console.log(inputElOne, inputElTwo, form, transactionEL);

// global variables
const transactionsDetails = [];
const transactionAmount = [];

//funtions

// eventListeners

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const transaction = inputElOne.value;
  const amount = inputElTwo.value;
  // console.log(amount);

  if (transaction.trim() !== "" && amount.trim() !== "") {
    const divEl = document.createElement("div");
    divEl.className = "transaction-type";
    divEl.innerHTML = `<span>${transaction}</span><span>${amount}</span>`;
    transactionEL.appendChild(divEl);
    // console.log(divEl, transaction, amount);

    transactionsDetails.push({
      transaction: transaction,
      amount: amount,
    });
    // console.log(transactionsDetails);
    if (amount > 0) {
      income.innerText += amount;
    } else if (amount < 0) {
      expense.innerText += amount;
    }

    for (let i = 0; i < transactionsDetails.length; i++) {
      console.log(transactionsDetails);
      let amount = Object.values(transactionsDetails[i]); //for loop
      console.log(Object.values(transactionsDetails[i]));
      console.log(amount[1]);
      transactionAmount.push(amount[1]);
      console.log(transactionAmount);
    }

    // transactionsDetails.forEach((v, i, a) => {
    //   console.log(v.amount);                         //forEach
    //   transactionAmount.push(v.amount);
    //   console.log(transactionAmount);
    // });

    // for (const { transaction, amount } of transactionsDetails) {
    //   let a = transactionAmount.push(amount);                                 // for of
    //   console.log(transactionAmount);
    // }
  } else {
    alert("fill all the Fields");
  }
});
console.log(transactionAmount);
