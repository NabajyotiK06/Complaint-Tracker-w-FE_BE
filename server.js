import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve frontend files
app.use(express.static("public"));

// In-memory complaint storage
let complaints = [];
let nextId = 1;

/* ================= API ROUTES ================= */

// GET all complaints
app.get("/complaints", (req, res) => {
  res.json(complaints);
});

// GET complaint by ID
app.get("/complaints/:id", (req, res) => {
  const id = Number(req.params.id);

  const complaint = complaints.find(c => c.id === id);

  if (!complaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  res.json(complaint);
});

// POST new complaint
app.post("/complaints", (req, res) => {
  const { name, email, subject, description } = req.body;

  const newComplaint = {
    id: `CMP${String(nextId).padStart(3, "0")}`,
    name,
    email,
    subject,
    description,
    status: "pending",
    createdAt: new Date().toLocaleString()
  };

  nextId++;
  complaints.push(newComplaint);

  res.status(201).json(newComplaint);
});

// UPDATE complaint status
app.put("/complaints/:id", (req, res) => {
  const { status } = req.body;
  const id = req.params.id;

  const complaint = complaints.find(c => c.id === id);

  if (!complaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  complaint.status = status;
  res.json(complaint);
});

// DELETE complaint
app.delete("/complaints/:id", (req, res) => {
  const id = req.params.id;

  complaints = complaints.filter(c => c.id !== id);

  res.json({ message: "Complaint deleted" });
});

/* ================= SERVER ================= */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
