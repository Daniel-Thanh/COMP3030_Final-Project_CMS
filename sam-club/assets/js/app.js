function loadDashboard() {
    fetch("../api/clubs.php")
    .then(res => res.json())
    .then(data => {
        document.getElementById("totalClubs").innerText = data.length;

        let table = document.getElementById("clubsTable");
        data.forEach(c => {
            table.innerHTML += `
                <tr>
                    <td>${c.club_name}</td>
                    <td>${c.category}</td>
                    <td>${c.status}</td>
                </tr>
            `;
        });
    });
}
