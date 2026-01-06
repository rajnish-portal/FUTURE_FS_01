// Scroll reveal
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));

// PROJECT DBMS USING localStorage
const projectList = document.getElementById("projectList");

function loadProjects() {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  projectList.innerHTML = "";

  projects.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p>`;
    projectList.appendChild(div);
  });
}

function addProject() {
  const title = document.getElementById("projectTitle").value;
  const desc = document.getElementById("projectDesc").value;

  if (!title || !desc) return alert("Fill all fields");

  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  projects.push({ title, desc });
  localStorage.setItem("projects", JSON.stringify(projects));

  document.getElementById("projectTitle").value = "";
  document.getElementById("projectDesc").value = "";

  loadProjects();
}
// Project expand / collapse
const toggleBtn = document.getElementById("toggleProjects");
const hiddenProjects = document.querySelectorAll(".hidden");

toggleBtn.addEventListener("click", () => {
  hiddenProjects.forEach(card => {
    card.style.display =
      card.style.display === "block" ? "none" : "block";
  });

  toggleBtn.textContent =
    toggleBtn.textContent === "View all projects"
      ? "Show less"
      : "View all projects";
});
fetch("data.json")
  .then(res => res.json())
  .then(posters => {
    const grid = document.getElementById("posterGrid");

    posters.forEach(poster => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${poster.image}" alt="${poster.title}">
        <h3>${poster.title}</h3>
      `;

      grid.appendChild(card);
    });
  });

// Contact form demo behavior
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("formStatus").textContent =
    "✔ Message sent successfully!";
});
/* =========================
   CURSOR FOLLOW GLOW
   ========================= */
document.querySelectorAll(".poster-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty("--x", `${x}%`);
    card.style.setProperty("--y", `${y}%`);
  });
});

/* =========================
   MODAL PREVIEW
   ========================= */
const modal = document.getElementById("posterModal");
const modalImg = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".poster-card").forEach(card => {
  card.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = card.dataset.image;
    modalTitle.textContent = card.dataset.title;
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});



// Load on start
loadProjects();
