window.onload = () => {
  fetch("../api/budgets.php")
    .then(r => r.json())
    .then(data => {
      let allocated = 0, spent = 0;
      let table = document.getElementById("expensesTable");

      data.forEach(b => {
        allocated += parseFloat(b.allocated_amount);
        spent += parseFloat(b.spent);

        table.innerHTML += `
          <tr>
            <td>${b.club_name}</td>
            <td>$${b.spent}</td>
            <td>${b.fiscal_year}</td>
          </tr>`;
      });

      document.getElementById("allocated").innerText = "$" + allocated;
      document.getElementById("spent").innerText = "$" + spent;
      document.getElementById("remaining").innerText = "$" + (allocated - spent);
    });
};
