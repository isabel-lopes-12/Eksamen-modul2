// henter id fra url
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// api link
const API_URL = `https://api.npoint.io/50c59220b5f6b049d324/career_paths/${id}`;

// image map
const imageMap = {
    career_software_engineer: "https://i.pinimg.com/736x/bb/47/16/bb4716949f167109ae14e6463cf90e0e.jpg",
    career_data_scientist: "https://i.pinimg.com/736x/0f/eb/ad/0febad3a087b53ef917062d084e53ef0.jpg",
    career_interaction_designer: "https://i.pinimg.com/1200x/71/dc/59/71dc59b82d8e3f884b9d73ed97fbd5ea.jpg",
    career_accountant: "https://i.pinimg.com/736x/37/62/98/376298546d6601deeefc91433772b00f.jpg",
    career_teacher: "https://i.pinimg.com/736x/4f/50/4a/4f504ab69fca94330eee9c85811c6427.jpg",
    career_doctor: "https://i.pinimg.com/736x/5a/a9/a1/5aa9a11761defadeca8167a4036a4cfd.jpg",
    career_mechanical_engineer: "https://i.pinimg.com/736x/2a/d6/2d/2ad62dbcbb55b84f94e1307743cc58f3.jpg",
    career_nurse: "https://i.pinimg.com/1200x/cc/2b/c7/cc2bc76e544c1baec747ac6fb4c9258f.jpg",
    career_civil_engineer: "https://i.pinimg.com/1200x/ca/27/4e/ca274e4c8948c60011052596c1dc7251.jpg"
};

// min egen statisk data slik at jeg kan få den reviewen jeg selv vil ha
const reviewsData = {
    career_software_engineer: [
        {
            country: "Norway",
            text: "High salary and flexible work. Requires continuous learning.",
            rating: 8
        },
        {
            country: "Global",
            text: "Strong demand worldwide with many remote opportunities.",
            rating: 9
        }
    ],

    career_interaction_designer: [
        {
            country: "Norway",
            text: "Creative work with good work-life balance.",
            rating: 7
        },
        {
            country: "Global",
            text: "Growing field, especially in tech companies.",
            rating: 8
        }
    ],

    career_data_scientist: [
        {
            country: "Norway",
            text: "Interesting and analytical work with strong demand.",
            rating: 8
        },
        {
            country: "Global",
            text: "One of the fastest growing careers in tech.",
            rating: 9
        }
    ],

    career_nurse: [
        {
            country: "Norway",
            text: "Very meaningful job but physically demanding.",
            rating: 7
        },
        {
            country: "Global",
            text: "High demand everywhere, but can be stressful.",
            rating: 8
        }
    ],

    career_doctor: [
        {
            country: "Norway",
            text: "Highly respected and impactful career, but long hours.",
            rating: 8
        },
        {
            country: "Global",
            text: "Stable and high demand, but requires many years of study.",
            rating: 9
        }
    ],

    career_teacher: [
        {
            country: "Norway",
            text: "Rewarding job with good work-life balance.",
            rating: 7
        },
        {
            country: "Global",
            text: "Important profession, but varies in pay globally.",
            rating: 6
        }
    ],

    career_mechanical_engineer: [
        {
            country: "Norway",
            text: "Solid engineering career with good stability.",
            rating: 7
        },
        {
            country: "Global",
            text: "Demand exists, especially in manufacturing and energy.",
            rating: 7
        }
    ],

    career_civil_engineer: [
        {
            country: "Norway",
            text: "Stable job with strong demand in infrastructure projects.",
            rating: 8
        },
        {
            country: "Global",
            text: "Important role globally with consistent demand.",
            rating: 8
        }
    ],

    career_accountant: [
        {
            country: "Norway",
            text: "Stable career, but becoming more automated.",
            rating: 6
        },
        {
            country: "Global",
            text: "Still needed worldwide, but evolving due to AI.",
            rating: 7
        }
    ]
};

//min egen historiske data slik at jeg kan få den infoen jeg selv vil ha
const historicalImpactsData = {

    career_software_engineer: [
        {
            period: "2007 – Smartphone revolution",
            impact: "Massive increase in demand for mobile app development and software platforms."
        },
        {
            period: "2015 – Cloud computing",
            impact: "Shift from local software to cloud-based systems increased scalability and job demand."
        },
        {
            period: "2023 – AI / LLMs",
            impact: "Automation of coding tasks, but increased need for advanced engineering and system design."
        }
    ],

    career_interaction_designer: [
        {
            period: "2010 – Rise of social media",
            impact: "Huge demand for user-friendly interfaces and engaging digital experiences."
        },
        {
            period: "2015 – Mobile-first design",
            impact: "Shift toward mobile UX increased importance of intuitive and responsive design."
        },
        {
            period: "2023 – AI interfaces",
            impact: "New focus on conversational design and human-AI interaction."
        }
    ],

    career_data_scientist: [
        {
            period: "2012 – Big data era",
            impact: "Explosion of data created demand for data analysis and machine learning roles."
        },
        {
            period: "2018 – AI adoption",
            impact: "Companies integrated AI, increasing need for predictive modeling and analytics."
        },
        {
            period: "2023 – Generative AI",
            impact: "Shift toward AI-driven insights and automation of basic analysis tasks."
        }
    ],

    career_nurse: [
        {
            period: "2000–2020 – Aging population",
            impact: "Steady increase in demand for healthcare professionals."
        },
        {
            period: "2020 – COVID-19 pandemic",
            impact: "Massive surge in demand and stress on healthcare systems globally."
        },
        {
            period: "Future – Healthcare technology",
            impact: "More digital tools, but human care remains essential."
        }
    ],

    career_doctor: [
        {
            period: "2000–2020 – Medical advancements",
            impact: "Improved treatments increased specialization and demand."
        },
        {
            period: "2020 – COVID-19",
            impact: "Critical importance of healthcare systems highlighted globally."
        },
        {
            period: "2023 – AI diagnostics",
            impact: "AI assists diagnosis, but doctors remain essential for decision-making."
        }
    ],

    career_teacher: [
        {
            period: "2010 – Digital learning tools",
            impact: "Introduction of smartboards, tablets, and online platforms."
        },
        {
            period: "2020 – Remote learning",
            impact: "Shift to online teaching during COVID accelerated digital education."
        },
        {
            period: "Future – AI in education",
            impact: "AI may assist teaching, but human interaction remains key."
        }
    ],

    career_mechanical_engineer: [
        {
            period: "2000–2015 – Industrial automation",
            impact: "Increased efficiency reduced some manual engineering roles."
        },
        {
            period: "2015 – Renewable energy",
            impact: "Growth in wind, solar, and green tech increased demand."
        },
        {
            period: "Future – Sustainability focus",
            impact: "Engineering shifts toward environmentally friendly solutions."
        }
    ],

    career_civil_engineer: [
        {
            period: "2000–2020 – Urbanization",
            impact: "Increased need for infrastructure and housing globally."
        },
        {
            period: "2015 – Climate awareness",
            impact: "Focus on sustainable and resilient infrastructure."
        },
        {
            period: "Future – Smart cities",
            impact: "Integration of technology into infrastructure planning."
        }
    ],

    career_accountant: [
        {
            period: "2000–2015 – Digital accounting",
            impact: "Shift from paper to software-based accounting systems."
        },
        {
            period: "2015 – Cloud systems",
            impact: "Automation of bookkeeping and financial reporting."
        },
        {
            period: "2023 – AI automation",
            impact: "Routine tasks automated, increasing focus on advisory roles."
        }
    ]

};


// hovedfunksjonen som kjører alt
async function loadDetails() {
    try {
        // fetcher api
        const res = await fetch(API_URL);

        const career = await res.json(); //json data for en spesifikk karriere

        renderTop(career); // funksjoner fra lengre ned, finner header
        renderDashboard(career); // funksjoner fra lengre ned,  lager grafer
        renderReviews(); // funksjoner fra lengre ned, lager reviews
        renderHistory(); // // funksjoner fra lengre ned, lager historisk informasjon

    } catch (err) { //catch debug feil hvis ting ikke funker
        console.error(err);
        document.body.innerHTML = "<h1>Error loading career</h1>";
    }
}

// header med tittel, bilde og beskrivelse
function renderTop(career) {

    //lager tittelen
    document.getElementById("careerTitle").textContent = career.title;

    //lager description, kan være string eller (||) objekt
    const desc =
        typeof career.description === "string"
            ? career.description
            : career.description?.summary || "No description";

    document.getElementById("careerDescription").textContent = desc;

    //velger bilde utifra prioritet så de jeg har valgt kommer først
    const image =
        imageMap[id] ||
        career.description?.image_links?.[0] ||
        "https://placehold.co/600x400";

    document.getElementById("careerImage").src = image;
}

// charts dashboard, samler alle chartsene jeg lager, har brukt highcharts libary som utgangspunkt her
function renderDashboard(career) {
    renderSalaryChart(career);
    renderGrowthChart(career);
    renderEducation(career);
}

// salary highchart
function renderSalaryChart(career) {
    const salary = career.economy?.norway?.average_salary_nok || 0;

    Highcharts.chart('salaryChart', {
        chart: { type: 'column' },
        title: { text: null },
        xAxis: { categories: ['Salary'] },
        yAxis: {
            title: { text: 'NOK' }
        },
        series: [{
            name: 'Salary',
            data: [salary],
            color: '#F6BC1D'
        }]
    });
}

// emplotment growthchart
function renderGrowthChart(career) {
    const growth = career.economy?.norway?.growth_trend;

    const value =
        growth === "fast_growing" ? 90 :
        growth === "medium" ? 60 : 30;

    Highcharts.chart('growthChart', {
        chart: { type: 'line' },
        title: { text: null },
        xAxis: {
            categories: ['2024', '2026', '2028', '2030']
        },
        yAxis: {
            title: { text: 'Growth Index' }
        },
        series: [{
            name: 'Growth',
            data: [value - 20, value - 10, value, value + 5],
            color: '#F6BC1D'
        }]
    });
}

// education pie chart
function renderEducation(career) {
    const education = career.education_options || [];
    const list = document.getElementById("educationList");

    list.innerHTML = "";

    const levels = {};

    education.forEach(ed => {
        const level = ed.level || "unknown";

        levels[level] = (levels[level] || 0) + 1;

        const div = document.createElement("div");
        div.className = "education-item";
        div.textContent = `${level} – ${(ed.providers || []).join(", ")}`;

        list.appendChild(div);
    });

    // mapper piecharten
    Highcharts.chart('educationChart', {
        chart: { type: 'pie' },
        title: { text: null },
        colors: ['#F6BC1D', '#090446', '#D03C3A'],
        series: [{
            name: 'Education',
            data: Object.keys(levels).map(level => ({
                name: level,
                y: levels[level],
            }))
        }]
    });
}

//reviews filtreringssystem
let currentReviewFilter = "all";

function renderReviews() {
    const container = document.getElementById("reviewsContainer");
    const reviews = reviewsData[id] || [];

    container.innerHTML = "";

    //lager filter basert på knapper med norway, global og alle
    const filtered = reviews.filter(r => {
        return currentReviewFilter === "all" || r.country === currentReviewFilter;
    });

    //sender til HTML dokumentet med inner html
    filtered.forEach(r => {
        const div = document.createElement("div");
        div.className = "review-card";

        div.innerHTML = `
            <div class="review-country">${r.country}</div>
            <p>${r.text}</p>

            <div class="rating-bar">
                <div style="width:${r.rating * 10}%"></div>
            </div>

            <div class="review-score">${r.rating}/10</div>
        `;

        container.appendChild(div);
    });
}

//knappelogikk
const showAllBtn = document.getElementById("showAll");
const showNorwayBtn = document.getElementById("showNorway");
const showGlobalBtn = document.getElementById("showGlobal");

const buttons = [showAllBtn, showNorwayBtn, showGlobalBtn];

//markerer aktiv knapp og fjerner den man har klikket på
function setActiveButton(activeBtn) {
    buttons.forEach(btn => btn.classList.remove("active"));
    activeBtn.classList.add("active");
}
//events
showAllBtn.addEventListener("click", () => {
    currentReviewFilter = "all";
    setActiveButton(showAllBtn);
    renderReviews();
});

showNorwayBtn.addEventListener("click", () => {
    currentReviewFilter = "Norway";
    setActiveButton(showNorwayBtn);
    renderReviews();
});

showGlobalBtn.addEventListener("click", () => {
    currentReviewFilter = "Global";
    setActiveButton(showGlobalBtn);
    renderReviews();
});


//historieseksjon
function renderHistory() {
    //henter data fra min statiske data
    const container = document.getElementById("historyContainer");
    const history = historicalImpactsData[id] || [];

    container.innerHTML = "";

    //hvis det ikke finnes i const vis no historical data
    if (history.length === 0) {
        container.innerHTML = "<p>No historical data</p>";
        return;
    }

    history.forEach(item => { // for hvert item lag en seksjom med historiedata
        const div = document.createElement("div");
        div.className = "history-item";

        div.innerHTML = `
            <span class="history-period">${item.period}</span>
            <span class="history-text">${item.impact}</span>
        `;

        container.appendChild(div);
    });
}
//starter alt
loadDetails();