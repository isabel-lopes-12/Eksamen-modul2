//api link
const API_URL = "https://api.npoint.io/50c59220b5f6b049d324";

//tomme variabler som lagrer data globalt etter fetch
let allCareers = [];
let allCareerPaths = {};

//map av de forskjellige api dataene 
const educationMap = {
    Bachelor: ["bachelor"],
    Master: ["master"],
    Technical: ["vocational_certificate", "upper_secondary_school"]
};

//map av de forskjellige api dataene
const stabilityMap = {
    Declining: ["declining"],
    Stable: ["stable"],
    Growing: ["growing"],
    "Fast growing": ["fast_growing"]
};

//map av de forskjellige api dataene
const institutionMap = {
    "Universitetet i Oslo": ["uio"],
    "Universitetet i Bergen": ["uib"],
    "Universitetet i Tromsø": ["uit"],
    NTNU: ["ntnu"]
};


//laster inn all data og fetcher api 
async function loadCareers() {
    const grid = document.getElementById("cardGrid");

    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        allCareers = data.career_options;
        allCareerPaths = data.career_paths;

        renderCareers(allCareers);

    } catch (error) {
        console.error(error);
        grid.innerHTML = "<p>Failed to load careers</p>";
    }
}

// 🔥 FIX: lagt til id + link
function createCard(detail, id) {
    const card = document.createElement("div");
    card.className = "card";

    const title = detail.title || "No title";
    const edu = detail.education_options?.[0]?.level || "N/A";
    const institution = detail.education_options?.[0]?.providers?.[0] || "N/A";
    const salary = detail.economy?.norway?.average_salary_nok || 0;
    const stability = detail.economy?.norway?.growth_trend || "N/A";

    card.innerHTML = `
        <h2>${title}</h2>
        <p>🎓 ${edu}</p>
        <p>🏫 ${institution}</p>
        <p>💰 ${(salary / 1000).toFixed(0)}k</p>
        <p>📊 ${stability}</p>

        <div class="card-button">
            <a href="detailedpage.html?id=${id}">
                Discover more →
            </a>
        </div>
    `;

    return card;
}

function renderCareers(ids) {
    const grid = document.getElementById("cardGrid"); 
    grid.innerHTML = "";

    ids.slice(0, 24).forEach(id => {
        const detail = allCareerPaths[id];
        if (!detail) return;

        // 🔥 FIX: sender med id
        grid.appendChild(createCard(detail, id));
    });
}


//filterlogikken
function applyFilters() {
    const selectedEdu = document.querySelector('input[name="edu"]:checked')?.value;

    const selectedInstitutions = [...document.querySelectorAll(".institution:checked")]
        .map(cb => cb.parentElement.textContent.trim());

    const selectedStability = [...document.querySelectorAll(".stability:checked")]
        .map(cb => cb.parentElement.textContent.trim());

    const maxSalary = Number(document.querySelector(".salary").value);

    const filtered = allCareers.filter(id => {
        const detail = allCareerPaths[id];
        if (!detail) return false;

        const edu = (detail.education_options?.[0]?.level || "").toLowerCase();
        const institution = (detail.education_options?.[0]?.providers?.[0] || "").toLowerCase();
        const salary = detail.economy?.norway?.average_salary_nok || 0;
        const stability = (detail.economy?.norway?.growth_trend || "").toLowerCase();

        if (selectedEdu !== "all") {
            const valid = educationMap[selectedEdu] || [];
            if (!valid.includes(edu)) return false;
        }

        if (selectedInstitutions.length > 0) {
            const match = selectedInstitutions.some(label =>
                (institutionMap[label] || []).includes(institution)
            );
            if (!match) return false;
        }

        if (selectedStability.length > 0) {
            const match = selectedStability.some(label =>
                (stabilityMap[label] || []).includes(stability)
            );
            if (!match) return false;
        }

        if (salary > maxSalary) return false;

        return true;
    });

    renderCareers(filtered);
}


//events
function setupFilters() {
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("change", applyFilters);
    });
}


//toggle vis /ikke vis filter
const toggleBtn = document.getElementById("toggleFilters");
const filters = document.getElementById("filtersSection");

if (toggleBtn && filters) {
    toggleBtn.addEventListener("click", () => {
        filters.classList.toggle("hidden");

        toggleBtn.textContent = filters.classList.contains("hidden")
            ? "Show filters"
            : "Hide filters";
    });
}


//starter alt
loadCareers();
setupFilters();
