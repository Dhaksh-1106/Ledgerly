// 

const token = localStorage.getItem("Token");
if (token == null) {
    window.location.assign("auth.html");
}

const form = document.querySelector("#add-expense-form");
const container = document.getElementById("expense-list-container");

// 1. Fetch and load dashboard data (metrics, table, and chart)
async function loadDashboard() {
    try {
        // Fetch summary for metrics and chart
        const summaryRes = await fetch("/api/expenses/summary", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!summaryRes.ok) throw new Error(`Summary fetch failed: ${summaryRes.status}`);
        const summaryData = await summaryRes.json();

        // Update metric cards in the DOM
        document.getElementById("total-spent").textContent = `$${summaryData.totalSpent.toFixed(2)}`;
        document.getElementById("monthly-budget").textContent = `$${summaryData.monthlyBudget.toFixed(2)}`;
        document.getElementById("remaining-allowance").textContent = `$${summaryData.remainingAllowance.toFixed(2)}`;

        // Fetch all expenses for the table history
        const expRes = await fetch("/api/expenses", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!expRes.ok) throw new Error(`Expenses fetch failed: ${expRes.status}`);
        const expenses = await expRes.json();

        renderExpenses(expenses);
        
        // If your chart engine function is available, update it here:
        // generate_chart(summaryData);

    } catch (err) {
        console.error(err.message);
    }
}

// 2. Render expenses into the table using the template
function renderExpenses(expenses) {
    const tbody = document.querySelector(".expense-table tbody");
    tbody.innerHTML = "";

    if (!expenses || expenses.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state">No expenses yet. Add your first expense to begin tracking.</div></td></tr>`;
        return;
    }

    const template = document.getElementById("expense-row-template");
    expenses.forEach(exp => {
        const clone = template.content.cloneNode(true);
        
        clone.querySelector('[data-field="title"]').textContent = exp.title;
        clone.querySelector('[data-field="category"]').textContent = exp.category;
        clone.querySelector('[data-field="date"]').textContent = exp.date ? exp.date.split('T')[0] : '';
        clone.querySelector('[data-field="amount"]').textContent = `$${Number(exp.amount).toFixed(2)}`;
        
        // Stamp the delete button with MongoDB _id
        const deleteBtn = clone.querySelector('[data-action="delete-expense"]');
        deleteBtn.dataset.id = exp._id;

        tbody.appendChild(clone);
    });
}

// 3. Handle Add Expense Form Submission
form.addEventListener("submit", async function(e) {
    e.preventDefault();
    const formdata = new FormData(form);
    const data = Object.fromEntries(formdata.entries());

    try {
        const response = await fetch("/api/expenses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(`Failed to save: ${response.status}`);

        form.reset();
        loadDashboard(); // Refresh metrics, table, and chart
    } catch (err) {
        console.error(err.message);
    }
});

// 4. Handle Delete Expense via Event Delegation
container.addEventListener("click", async function(e) {
    const targetButton = e.target.closest('[data-action="delete-expense"]');
    if (!targetButton) return;

    const expenseId = targetButton.dataset.id;
    if (!expenseId) return;

    try {
        const response = await fetch(`/api/expenses/${expenseId}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) throw new Error(`Failed to delete: ${response.status}`);

        loadDashboard(); // Refresh metrics, table, and chart
    } catch (err) {
        console.error(err.message);
    }
});

// Initial load when script runs
loadDashboard();

