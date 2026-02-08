/* =========================
   COMMON VARIABLES
========================= */

const form = document.getElementById("complaintForm");
const message = document.getElementById("message");
const complaintsDiv = document.getElementById("complaints");

const totalCountEl = document.getElementById("totalCount");
const pendingCountEl = document.getElementById("pendingCount");
const resolvedCountEl = document.getElementById("resolvedCount");
const rejectedCountEl = document.getElementById("rejectedCount");

/* =========================
   USER PORTAL LOGIC
========================= */

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect form data
    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      description: document.getElementById("description").value
    };

    try {
      const response = await fetch("/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      message.innerText = `Complaint submitted with ID: ${result.id}`;
      message.style.color = "green";

      form.reset();
    } catch (error) {
      message.innerText = "Error submitting complaint";
      message.style.color = "red";
    }
  });
}

/* =========================
   ADMIN DASHBOARD LOGIC
========================= */

if (complaintsDiv) {
  loadComplaints();
}

async function loadComplaints() {
  const response = await fetch("/complaints");
  const complaints = await response.json();

  complaintsDiv.innerHTML = "";

  // Counters
  let total = complaints.length;
  let pending = 0;
  let resolved = 0;
  let rejected = 0;

  complaints.forEach(c => {
    // Count statuses
    if (c.status === "pending") pending++;
    if (c.status === "resolved") resolved++;
    if (c.status === "rejected") rejected++;

    const div = document.createElement("div");
    div.className = "complaint";

    const statusClass = c.status.toLowerCase();

    div.innerHTML = `
      <strong>${c.id}</strong>
      <span class="badge ${statusClass}">
        ${c.status.toUpperCase()}
      </span>
      <br><br>

      <b>${c.subject}</b><br>
      ${c.name} (${c.email})<br><br>

      <select onchange="updateStatus('${c.id}', this.value)">
        <option value="pending" ${c.status === "pending" ? "selected" : ""}>
          Pending
        </option>
        <option value="resolved" ${c.status === "resolved" ? "selected" : ""}>
          Resolved
        </option>
        <option value="rejected" ${c.status === "rejected" ? "selected" : ""}>
          Rejected
        </option>
      </select>

      <button onclick="deleteComplaint('${c.id}')">
        Delete
      </button>
    `;

    complaintsDiv.appendChild(div);
  });

  // Update dashboard counters
  if (totalCountEl) totalCountEl.innerText = total;
  if (pendingCountEl) pendingCountEl.innerText = pending;
  if (resolvedCountEl) resolvedCountEl.innerText = resolved;
  if (rejectedCountEl) rejectedCountEl.innerText = rejected;
}

/* =========================
   UPDATE STATUS
========================= */

function updateStatus(id, status) {
  fetch(`/complaints/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  }).then(() => loadComplaints());
}

/* =========================
   DELETE COMPLAINT
========================= */

function deleteComplaint(id) {
  fetch(`/complaints/${id}`, {
    method: "DELETE"
  }).then(() => loadComplaints());
}
