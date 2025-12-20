window.onload = () => {
  loadAdvisors();
  loadClubs();
};

function loadAdvisors() {
  fetch("../api/advisors.php")
    .then(r => r.json())
    .then(data => {
      let table = document.getElementById("advisorsTable");
      data.forEach(a => {
        table.innerHTML += `
          <tr>
            <td>${a.full_name}</td>
            <td>${a.department}</td>
            <td>
              <button class="btn btn-sm btn-primary"
                onclick="assign(${a.advisor_id})">
                Assign
              </button>
            </td>
          </tr>`;
      });
    });
}

function loadClubs() {
  fetch("../api/clubs.php")
    .then(r => r.json())
    .then(data => {
      let select = document.getElementById("clubSelect");
      data.forEach(c => {
        select.innerHTML += `<option value="${c.club_id}">
          ${c.club_name}
        </option>`;
      });
    });
}

function assign(advisorId) {
  fetch("../api/club_advisors.php", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      advisor_id: advisorId,
      club_id: document.getElementById("clubSelect").value,
      start_date: document.getElementById("startDate").value,
      end_date: document.getElementById("endDate").value
    })
  })
  .then(r => r.json())
  .then(() => alert("Assigned successfully"));
}
