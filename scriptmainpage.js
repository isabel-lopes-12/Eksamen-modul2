// link til api
const API_URL = "https://api.npoint.io/50c59220b5f6b049d324";

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

const defaultImage = "https://placehold.co/300x200?text=Career";

async function loadCareers() {
    const grid = document.getElementById("cardGrid");

    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        const careers = data.career_options;
        const careerPaths = data.career_paths;

        grid.innerHTML = "";

        for (let i = 0; i < Math.min(9, careers.length); i++) {
            const id = careers[i];
            const detail = careerPaths[id];

            const card = createCard(detail, id);
            grid.appendChild(card);
        }

    } catch (error) {
        console.error("MAIN ERROR:", error);
        grid.innerHTML = "<p>Failed to load careers</p>";
    }
}

function formatSalary(nok) {
    if (!nok) return "N/A";
    return `${(nok / 1000).toFixed(0)}k per year`;
}

function createCard(detail, id) {
    const card = document.createElement("div");
    card.className = "card";

    const image = imageMap[id]
        || detail.description?.image_links?.[0]
        || defaultImage;

    let description = "No description available";
    if (typeof detail.description === "string") {
        description = detail.description;
    } else if (typeof detail.description === "object") {
        description = detail.description.summary
            || detail.description.short
            || detail.description.long
            || description;
    }

    const educationLevel = detail.education_options?.[0]?.level
        || detail.category
        || "N/A";

    const institution = detail.education_options?.[0]?.providers?.[0]
        || "N/A";

    const salaryNok = detail.economy?.norway?.average_salary_nok;
    const salary = formatSalary(salaryNok);

    const stability = detail.economy?.norway?.growth_trend || "N/A";

    card.innerHTML = `
        <h2>${detail.title || "No title"}</h2>
        <img src="${image}" alt="${detail.title}" />
        <div class="tags">
            <div class="tag">🎓 Education level:  ${educationLevel}</div>
            <div class="tag">🏫 Institution:  ${institution}</div>
            <div class="tag">📊 AI-stability:  ${stability}</div>
            <div class="tag">💰 Salary:  ${salary}</div>
        </div>
        <p>${description}</p>
        <div class="card-button">
            <a href="detailedpage.html?id=${id}">Discover more</a>
        </div>
    `;

    return card;
}

loadCareers();
