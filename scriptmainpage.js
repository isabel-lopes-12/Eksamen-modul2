// link til api
const API_URL = "https://api.npoint.io/50c59220b5f6b049d324";

// samler alle bildene i en const sn at jeg kan bruke de bildene jeg vil og ikke api bildene
const imageMap = {
    career_software_engineer: "https://i.pinimg.com/736x/bb/47/16/bb4716949f167109ae14e6463cf90e0e.jpg",
    career_data_scientist: "https://i.pinimg.com/736x/0f/eb/ad/0febad3a087b53ef917062d084e53ef0.jpg",
    career_interaction_designer: "https://i.pinimg.com/1200x/71/dc/59/71dc59b82d8e3f884b9d73ed97fbd5ea.jpg",
    career_accountant: "https://i.pinimg.com/736x/37/62/98/376298546d6601deeefc91433772b00f.jpg",
    career_teacher: "https://i.pinimg.com/736x/4f/50/4a/4f504ab69fca94330eee9c85811c6427.jpg",
    career_doctor: "https://i.pinimg.com/736x/5a/a9/a1/5aa9a11761defadeca8167a4036a4cfd.jpg",
    career_mechanical_engineer: "https://i.pinimg.com/736x/2a/d6/2d/2ad62dbcbb55b84f94e1307743cc58f3.jpg",
    career_nurse: "https://i.pinimg.com/1200x/cc/2b/c7/cc2bc76e544c1baec747ac6fb4c9258f.jpg",           // ✅ added
    career_civil_engineer: "https://i.pinimg.com/1200x/ca/27/4e/ca274e4c8948c60011052596c1dc7251.jpg"      // ✅ added
};

// lager en default hvis ingenting finnes som bare er blank
const defaultImage = "https://placehold.co/300x200?text=Career";

//henter og renderer alle karrierene
async function loadCareers() {
    const grid = document.getElementById("cardGrid"); //lager en konst og henter id-en fra html dokumentet

    try { //prøv
        const res = await fetch(API_URL); //henter data fra api
        const data = await res.json(); // konverterer til json

        const careers = data.career_options; //gir en liste med masse id-er
        const careerPaths = data.career_paths; //den faktiske dataene som vi trenger til oppgaven

        grid.innerHTML = ""; //resetter grid før vi lager cardsene

        for (let i = 0; i < Math.min(9, careers.length); i++) { //loop gjennom maks 9 karrierer
            const id = careers[i]; // career items f.eks. career_doctor
            const detail = careerPaths[id]; //henter data for valgt ting

            const card = createCard(detail, id); //lager card basert pa id
            grid.appendChild(card); //legger inn i DOM / html
        }

    } catch (error) { // catcher en feil hvis fetch api failer
        console.error("MAIN ERROR:", error);
        grid.innerHTML = "<p>Failed to load careers</p>";
    }
}

// gjør at salary blir mer lesbar enn hva som var formatert i api dokumentet
function formatSalary(nok) {
    if (!nok) return "N/A";
    return `${(nok / 1000).toFixed(0)}k per year`;
}

// lager ett card som man kan gjenbruke (funksjon)
function createCard(detail, id) {
    const card = document.createElement("div");
    card.className = "card";

    //velger bilde sånn at mitt image kart har prioritet over api bildet 
    const image = imageMap[id]
        || detail.description?.image_links?.[0] //1. min 2. api 3. default
        || defaultImage;

    //håndterer ulike typer description sånn tekst vs. objekt
    let description = "No description available";
    if (typeof detail.description === "string") {
        description = detail.description;

    } else if (typeof detail.description === "object") {
        description = detail.description.summary
            || detail.description.short // || = OR
            || detail.description.long
            || description;
    }

    //henter hva utdanningsnivået er
    const educationLevel = detail.education_options?.[0]?.level
        || detail.category
        || "N/A";

    //henter hva instutisjonen er
    const institution = detail.education_options?.[0]?.providers?.[0]
        || "N/A";

    //lønn
    const salaryNok = detail.economy?.norway?.average_salary_nok;
    const salary = formatSalary(salaryNok);

    //stabilitet
    const stability = detail.economy?.norway?.growth_trend || "N/A";

    //tar all JS informasjonen og variablene og strukturerer kortet i HTML
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
            <a href="../detailed-page/detailedpage.html?id=${id}">Discover more</a>
        </div>
    `;

    return card; //returnerer ferdig kort
}

//starter hele greia
loadCareers();