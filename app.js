const form = document.getElementById('expense-form');
const list = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total-amount');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function renderExpenses() {
  list.innerHTML = '';
  let total = 0;

  expenses.forEach((item, index) => {
    total += parseFloat(item.amount);
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.desc} - ₹${parseFloat(item.amount).toFixed(2)}</span>
      <button class="delete-btn" onclick="deleteExpense(${index})">X</button>
    `;
    list.appendChild(li);
  });

  totalDisplay.textContent = `₹${total.toFixed(2)}`;
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const desc = document.getElementById('desc').value;
  const amount = document.getElementById('amount').value;
  expenses.push({ desc, amount });
  form.reset();
  renderExpenses();
});

window.deleteExpense = (index) => {
  expenses.splice(index, 1);
  renderExpenses();
};

renderExpenses();
