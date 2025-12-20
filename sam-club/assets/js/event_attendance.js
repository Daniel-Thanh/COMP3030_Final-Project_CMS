window.onload = () => {
  fetch("../api/event_attendance.php")
    .then(r => r.json())
    .then(data => {
      let t = document.getElementById("attendanceTable");
      data.forEach(a => {
        t.innerHTML += `
          <tr>
            <td>${a.event_name}</td>
            <td>${a.full_name}</td>
            <td>${a.participation_status}</td>
            <td>
              <button class="btn btn-sm btn-success"
                onclick="mark('${a.event_id}','${a.student_id}','Attended')">
                Attended
              </button>
              <button class="btn btn-sm btn-danger"
                onclick="mark('${a.event_id}','${a.student_id}','Absent')">
                Absent
              </button>
            </td>
          </tr>`;
      });
    });
};

function mark(eventId, studentId, status) {
  fetch("../api/event_attendance.php", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      event_id: eventId,
      student_id: studentId,
      status: status
    })
  })
  .then(() => location.reload());
}
