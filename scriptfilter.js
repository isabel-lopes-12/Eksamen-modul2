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
    const grid = document.getElementById("cardGrid"); //container for cards

    try {
        const res = await fetch(API_URL); //fetcher og gjør det om til json
        const data = await res.json(); //konverterer til js objekt

        //lagrer data globalt sånn at andre funksjoner kan bruke det
        allCareers = data.career_options;
        allCareerPaths = data.career_paths;

        renderCareers(allCareers); //viser første liste med alle karrierene 

    } catch (error) {
        console.error(error); //hvis det blir en feil lager den feilmelding
        grid.innerHTML = "<p>Failed to load careers</p>";
    }
}

//lager ett kort for hver karriere
function createCard(detail) {
    const card = document.createElement("div");
    card.className = "card";

    //hvis data mangler
    const title = detail.title || "No title";
    const edu = detail.education_options?.[0]?.level || "N/A";
    const institution = detail.education_options?.[0]?.providers?.[0] || "N/A";
    const salary = detail.economy?.norway?.average_salary_nok || 0;
    const stability = detail.economy?.norway?.growth_trend || "N/A";

    //fyller kortet med html gjennom placeholders
    card.innerHTML = `
        <h2>${title}</h2>
        <p>🎓 ${edu}</p>
        <p>🏫 ${institution}</p>
        <p>💰 ${(salary / 1000).toFixed(0)}k</p>
        <p>📊 ${stability}</p>
    `;

    return card; //returnerer ferdig element
}

function renderCareers(ids) {
    const grid = document.getElementById("cardGrid"); 
    grid.innerHTML = ""; //tømmer tidligere cards

    //gjør sånn at det vises maks 24 kort
    ids.slice(0, 24).forEach(id => {
        const detail = allCareerPaths[id]; //finner detaljer via id
        if (!detail) return; //hvis data ikke finner hopper den over

        grid.appendChild(createCard(detail)); //lager og legger til card
    });
}


//filterlogikken
function applyFilters() {
    //henter valgt education (radiobutton)
    const selectedEdu = document.querySelector('input[name="edu"]:checked')?.value;

    //henter valgte instutisjoner (checkbox)
    const selectedInstitutions = [...document.querySelectorAll(".institution:checked")]
        .map(cb => cb.parentElement.textContent.trim());

    //henter valgt stabilitet
    const selectedStability = [...document.querySelectorAll(".stability:checked")]
        .map(cb => cb.parentElement.textContent.trim());

    //henter maks lønn fra slider
    const maxSalary = Number(document.querySelector(".salary").value);

    //filtrerer alle careers basert på valgene
    const filtered = allCareers.filter(id => {
        const detail = allCareerPaths[id];
        if (!detail) return false;

        //normaliserer data(lowercase for sammenligning)
        const edu = (detail.education_options?.[0]?.level || "").toLowerCase();
        const institution = (detail.education_options?.[0]?.providers?.[0] || "").toLowerCase();
        const salary = detail.economy?.norway?.average_salary_nok || 0;
        const stability = (detail.economy?.norway?.growth_trend || "").toLowerCase();


        //filtrer på education
        if (selectedEdu !== "all") {
            const valid = educationMap[selectedEdu] || [];
            if (!valid.includes(edu)) return false;
        }

        //filtrer på institution
        if (selectedInstitutions.length > 0) {
            const match = selectedInstitutions.some(label =>
                (institutionMap[label] || []).includes(institution)
            );
            if (!match) return false;
        }

        //filtrer på stability
        if (selectedStability.length > 0) {
            const match = selectedStability.some(label =>
                (stabilityMap[label] || []).includes(stability)
            );
            if (!match) return false;
        }

        //filtrer på salary
        if (salary > maxSalary) return false;

        return true;
    });

    renderCareers(filtered);//vis filtrert liste
}


//events
function setupFilters() {
    //legger event listner på alle inputs (auto filtrer ved endring)
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("change", applyFilters);
    });
}


//toggle vis /ikke vis filter
const toggleBtn = document.getElementById("toggleFilters");
const filters = document.getElementById("filtersSection");

if (toggleBtn && filters) {
    //skjekker at elementene finnes før vi bruker dem
    toggleBtn.addEventListener("click", () => {
        filters.classList.toggle("hidden"); //skjul/vis filterene

        //endrer knappeteksten ved klikk
        toggleBtn.textContent = filters.classList.contains("hidden")
            ? "Show filters"
            : "Hide filters";
    });
}


//starter alt
loadCareers();
setupFilters();