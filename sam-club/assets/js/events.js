window.onload = () => {
  loadClubs();
  loadEvents();
};

function loadClubs() {
  fetch("../api/clubs.php")
    .then(r => r.json())
    .then(data => {
      let s = document.getElementById("clubSelect");
      data.forEach(c => {
        s.innerHTML += `<option value="${c.club_id}">${c.club_name}</option>`;
      });
    });
}

function loadEvents() {
  fetch("../api/events.php")
    .then(r => r.json())
    .then(data => {
      let t = document.getElementById("eventsTable");
      data.forEach(e => {
        t.innerHTML += `
          <tr>
            <td>${e.event_name}</td>
            <td>${e.club_name}</td>
            <td>${e.event_date}</td>
            <td>${e.status}</td>
            <td>
              <button class="btn btn-sm btn-success"
                onclick="approve(${e.event_id}, 'Approved')">Approve</button>
              <button class="btn btn-sm btn-danger"
                onclick="approve(${e.event_id}, 'Rejected')">Reject</button>
            </td>
          </tr>`;
      });
    });
}

function createEvent() {
  fetch("../api/create_event.php", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      club_id: document.getElementById("clubSelect").value,
      event_name: document.getElementById("eventName").value,
      event_date: document.getElementById("eventDate").value,
      location: document.getElementById("location").value
    })
  })
  .then(r => r.json())
  .then(() => location.reload());
}

function approve(id, status) {
  fetch("../api/approve_event.php", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ event_id: id, status })
  })
  .then(() => location.reload());
}
