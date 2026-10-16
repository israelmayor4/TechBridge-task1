// Challenge Data Array
const challenges = [
  {
    id: 1,
    title: "Sales & Revenue Analysis",
    track: "Data Analytics",
    difficulty: "Beginner",
    description: "Analyze monthly transaction data to identify top-performing products and sales trends.",
    outcome: "Clean dataset with clear summary statistics showing monthly performance.",
    objective: "Perform data cleaning, extract insights, and summarize revenue trends across regions.",
    skills: "Excel, Data Cleaning, Basic Visualization",
    tools: "MS Excel / Google Sheets",
    time: "2 - 3 hours",
    result: "A completed summary spreadsheet with key visual charts."
  },
  {
    id: 2,
    title: "Customer Churn Dashboard",
    track: "Data Analytics",
    difficulty: "Intermediate",
    description: "Build an interactive dashboard tracking active versus lost customers over time.",
    outcome: "Interactive dashboard featuring drill-down filters and key churn metrics.",
    objective: "Transform customer raw logs into visual KPIs to assist retention decision-making.",
    skills: "Data Modeling, KPI Creation, Dashboarding",
    tools: "Power BI / Tableau",
    time: "4 - 5 hours",
    result: "A multi-page interactive dashboard export."
  },
  {
    id: 3,
    title: "Employee Performance Metrics",
    track: "Data Analytics",
    difficulty: "Advanced",
    description: "Evaluate department productivity logs and visualize cross-departmental efficiency.",
    outcome: "Automated analysis report identifying high-value teams and areas for training.",
    objective: "Correlate employee feedback, project output, and time tracking datasets.",
    skills: "Python, Pandas, Statistical Analysis",
    tools: "Jupyter Notebook, Pandas",
    time: "5 - 6 hours",
    result: "Python notebook featuring structured visualizations and insights."
  },
  {
    id: 4,
    title: "Responsive Tech Landing Page",
    track: "Web Development",
    difficulty: "Beginner",
    description: "Construct a clean, responsive landing page for a modern software product.",
    outcome: "Mobile-ready landing page styled according to strict design guidelines.",
    objective: "Implement semantic HTML5 layout structures with custom CSS Flexbox styling.",
    skills: "HTML5, CSS3, Responsive Web Design",
    tools: "VS Code, Chrome DevTools",
    time: "3 - 4 hours",
    result: "Fully responsive landing page working across mobile and desktop viewports."
  },
  {
    id: 5,
    title: "Interactive Task Manager App",
    track: "Web Development",
    difficulty: "Intermediate",
    description: "Develop a functional single-page application allowing users to create, complete, and filter tasks.",
    outcome: "Dynamic task tracking interface powered by browser DOM operations.",
    objective: "Master JavaScript event listeners, DOM manipulation, and dynamic array filtering.",
    skills: "JavaScript ES6, DOM Manipulation, CSS Grid",
    tools: "VS Code, Git",
    time: "4 - 5 hours",
    result: "Interactive task app with real-time filtering features."
  },
  {
    id: 6,
    title: "API-Powered Weather Hub",
    track: "Web Development",
    difficulty: "Advanced",
    description: "Fetch live global weather statistics using REST APIs and display customized forecasts.",
    outcome: "Real-time weather application with search, detailed weather metrics, and async loading.",
    objective: "Handle asynchronous JavaScript requests, process JSON data, and manage API states.",
    skills: "Fetch API, Async/Await, Web Security, CSS Animations",
    tools: "OpenWeather API, JavaScript ES6+",
    time: "5 - 7 hours",
    result: "Live web application consuming real-time external data."
  }
];

// Active State Trackers
let currentTrackFilter = "all";
let currentDiffFilter = "all";

// DOM Element References
const gridContainer = document.getElementById("challenges-grid");
const noResultsElement = document.getElementById("no-results");
const modalElement = document.getElementById("challenge-modal");
const closeModalBtn = document.getElementById("modal-close");
const closeModalBtnBottom = document.getElementById("modal-close-btn");

// Initialize Page
document.addEventListener("DOMContentLoaded", () => {
  renderChallenges();
  setupFilterListeners();
  setupModalListeners();
});

// Render Challenge Cards
function renderChallenges() {
  gridContainer.innerHTML = "";

  const filtered = challenges.filter(c => {
    const matchesTrack = currentTrackFilter === "all" || c.track === currentTrackFilter;
    const matchesDiff = currentDiffFilter === "all" || c.difficulty === currentDiffFilter;
    return matchesTrack && matchesDiff;
  });

  if (filtered.length === 0) {
    noResultsElement.style.display = "block";
  } else {
    noResultsElement.style.display = "none";
    filtered.forEach(item => {
      const card = createCardElement(item);
      gridContainer.appendChild(card);
    });
  }
}

// Create Card Element Node
function createCardElement(item) {
  const card = document.createElement("div");
  card.className = "challenge-card";

  const badgeClass = item.track === "Data Analytics" ? "badge-analytics" : "badge-web";
  const diffClass = item.difficulty.toLowerCase();

  card.innerHTML = `
    <div>
      <div class="challenge-header">
        <span class="card-badge ${badgeClass}">${item.track}</span>
        <span class="difficulty ${diffClass}">${item.difficulty}</span>
      </div>
      <h3>${item.title}</h3>
      <p class="desc">${item.description}</p>
      <div class="outcome-box">
        <strong>Expected Outcome:</strong>
        ${item.outcome}
      </div>
    </div>
    <button class="btn2 view-btn" onclick="openModal(${item.id})">View Challenge</button>
  `;

  return card;
}

// Event Listeners for Filters
function setupFilterListeners() {
  const trackBtns = document.querySelectorAll(".track-btn");
  trackBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      trackBtns.forEach(b => b.classList.remove("active-track"));
      e.target.classList.add("active-track");
      currentTrackFilter = e.target.getAttribute("data-track");
      renderChallenges();
    });
  });

  const diffBtns = document.querySelectorAll(".diff-btn");
  diffBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      diffBtns.forEach(b => b.classList.remove("active-diff"));
      e.target.classList.add("active-diff");
      currentDiffFilter = e.target.getAttribute("data-diff");
      renderChallenges();
    });
  });
}

// Modal View Handler
function openModal(id) {
  const item = challenges.find(c => c.id === id);
  if (!item) return;

  document.getElementById("modal-title").innerText = item.title;
  document.getElementById("modal-description").innerText = item.description;
  document.getElementById("modal-track").innerText = item.track;
  document.getElementById("modal-track").className = `card-badge ${item.track === 'Data Analytics' ? 'badge-analytics' : 'badge-web'}`;
  
  const diffBadge = document.getElementById("modal-diff");
  diffBadge.innerText = item.difficulty;
  diffBadge.className = `difficulty ${item.difficulty.toLowerCase()}`;

  document.getElementById("modal-objective").innerText = item.objective;
  document.getElementById("modal-skills").innerText = item.skills;
  document.getElementById("modal-tools").innerText = item.tools;
  document.getElementById("modal-time").innerText = item.time;
  document.getElementById("modal-result").innerText = item.result;

  modalElement.classList.add("active");
}

function closeModal() {
  modalElement.classList.remove("active");
}

function setupModalListeners() {
  closeModalBtn.addEventListener("click", closeModal);
  closeModalBtnBottom.addEventListener("click", closeModal);
  modalElement.addEventListener("click", (e) => {
    if (e.target === modalElement) closeModal();
  });
}