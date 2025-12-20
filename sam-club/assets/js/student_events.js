window.onload = () => {
  fetch("../api/events_public.php")
    .then(r => r.json())
    .then(data => {
      let t = document.getElementById("eventsTable");
      data.forEach(e => {
        t.innerHTML += `
          <tr>
            <td>${e.event_name}</td>
            <td>${e.event_date}</td>
            <td>${e.location}</td>
            <td>
              <button class="btn btn-sm btn-primary"
                onclick="register(${e.event_id})">
                Register
              </button>
            </td>
          </tr>`;
      });
    });
};

function register(eventId) {
  fetch("../api/event_participants.php", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ event_id: eventId })
  })
  .then(r => r.json())
  .then(res => alert(res.success ? "Registered" : res.error));
}
