//API link
const API_URL = "https://api.npoint.io/50c59220b5f6b049d324";

//setter forskjellige states
let careersData = {};
let selected = [null, null];

//lager et kart for grafene
const growthMap = {
    fast_growing: 90,
    medium: 60,
    slow: 30
};

//laster inn all data
async function loadData() {
    try {
        const res = await fetch(API_URL); //fetcher api
        const data = await res.json();
        careersData = data.career_paths;

        setupSearch("search1", 0); //søkefelt 1
        setupSearch("search2", 1); //søkefelt 2
    } catch (err) {
        console.error("Failed to load data:", err); //feilmelding hvis det ikke funker
    }
}

//søkefunksjon
function setupSearch(inputId, index) {
    const input = document.getElementById(inputId); //henter id fra html dokumentet 

    input.addEventListener("input", () => { //legger til event listner for input som hører når brukeren skriver et ord 
        const value = input.value.toLowerCase().trim();

        if (!value) { //hvis brukeren har slettet teksten så fjerner den valgt karriere
            selected[index] = null;
            render();
            return;
        }

        const matches = Object.entries(careersData).filter(([_, c]) => //filtrerer karrierer basert på om tittelen matcher input
            c.title.toLowerCase().includes(value)
        );

        if (matches.length && value.length > 1) { //brukeren må skrive minst 2 bokstaver
            const [id, data] = matches[0]; //tar det første treffet
            selected[index] = { id, data }; //lagrer valget
            render(); //viser valget
        }
    });
}

//grafen for employment growth
function renderGrowthChart(containerId, career) {
    const growth = career.economy?.norway?.growth_trend;
    const value = growthMap[growth] || 30;

    Highcharts.chart(containerId, { //mapper highchart
        chart: { type: 'line' },
        title: { text: null },
        xAxis: {
            categories: ['2024', '2026', '2028', '2030']
        },
        yAxis: {
            title: { text: 'Growth Index' }
        },
        series: [{
            name: 'Employment growth',
            data: [value - 20, value - 10, value, value + 5],
            color: '#F6BC1D'
        }]
    });
}

// RENDER
function render() {
    //finner conteriner hvor resultatene skal vises
    const box = document.getElementById("compareResult");

    //hvis ingenting er valgt vis teksten select at least one career
    if (!selected[0] && !selected[1]) {
        box.innerHTML = "<p>Select at least one career</p>";
        return;
    }

    //tømmer innholdet før vi legger inn nytt
    box.innerHTML = "";

    //går gjennom de valgte karieerene (max 2)
    selected.forEach(c => {
        if (!c) return; //hvis en av dem er tom hopp over

        const d = c.data; //selve karriere dataen
        const graphId = `growth-${c.id}`; //finner grafen

        //lager html for ett kort
        box.innerHTML += `
            <div class="card">
                <h2>${d.title}</h2>

                <p>${d.description?.summary || "No description"}</p>

                <div class="card-button">
                    <a href="detailedpage.html?id=${c.id}">
                        View full details →
                    </a>
                </div>

                <div id="${graphId}" style="height:200px;"></div>
            </div>
        `;

        //tegner grafen etter at html er lagt inn
        setTimeout(() => {
            renderGrowthChart(graphId, d);
        }, 0);
    });
}

//laster hele greia
loadData();
