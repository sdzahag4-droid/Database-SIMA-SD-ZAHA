const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwdtG9t1EZuXuAHXiT5rY45i9p7ImEWXT5DEh6_G6YoBq3QpDnsOJDkfUPOAyTznHOb/exec";
let currentTab = "Siswa";

async function loadData(sheetName) {
    currentTab = sheetName;
    document.getElementById("sectionTitle").innerText = "Data " + sheetName;
    let res = await fetch(`${WEB_APP_URL}?action=getData&sheet=${sheetName}`);
    let data = await res.json();
    renderTable(data);
}

function renderTable(data) {
    let headersTr = document.getElementById("tableHeaders");
    let tbody = document.getElementById("tableBody");
    headersTr.innerHTML = "";
    tbody.innerHTML = "";

    if (data.length === 0) return;

    let keys = Object.keys(data[0]);
    keys.forEach(key => {
        let th = document.createElement("th");
        th.innerText = key;
        headersTr.appendChild(th);
    });

    data.forEach(row => {
        let tr = document.createElement("tr");
        keys.forEach(key => {
            let td = document.createElement("td");
            td.innerText = row[key];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

function filterTable() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let rows = document.querySelectorAll("#tableBody tr");
    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
    });
}

function switchTab(tab) {
    if(tab === 'siswa') loadData('Siswa');
    if(tab === 'guru') loadData('GuruKaryawan');
    if(tab === 'jadwal') loadData('Jadwal');
    if(tab === 'surat') loadData('Surat');
}

// Load default
loadData('Siswa');