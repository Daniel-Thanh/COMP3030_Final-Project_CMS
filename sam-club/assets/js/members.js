window.onload = () => {
    loadStudents();
    loadClubs();
};

function loadStudents() {
    fetch("../api/students.php")
    .then(res => res.json())
    .then(data => {
        let table = document.getElementById("studentsTable");
        data.forEach(s => {
            table.innerHTML += `
              <tr>
                <td>${s.full_name}</td>
                <td>${s.program}</td>
                <td>
                  <button class="btn btn-sm btn-primary"
                    onclick="addToClub(${s.student_id})">
                    Add to Club
                  </button>
                </td>
              </tr>`;
        });
    });
}

function loadClubs() {
    fetch("../api/clubs.php")
    .then(res => res.json())
    .then(data => {
        let select = document.getElementById("clubSelect");
        data.forEach(c => {
            select.innerHTML += `<option value="${c.club_id}">
              ${c.club_name}
            </option>`;
        });
    });
}

function addToClub(studentId) {
    fetch("../api/memberships.php", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            student_id: studentId,
            club_id: document.getElementById("clubSelect").value,
            role: "Member"
        })
    })
    .then(res => res.json())
    .then(() => alert("Student added to club"));
}
