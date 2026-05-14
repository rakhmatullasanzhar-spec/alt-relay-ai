async function loadWeather(){

    const response = await fetch("/weather")

    const data = await response.json()

    document.getElementById("temp").innerText =
        "Температура: " + data.current_weather.temperature + "°C"

    document.getElementById("wind").innerText =
        "Ветер: " + data.current_weather.windspeed + " км/ч"

    if(data.current_weather.windspeed > 20){

        document.getElementById("weatherStatus").innerText =
            "⚠ Высокая ветровая нагрузка на линии"

    } else {

        document.getElementById("weatherStatus").innerText =
            "✅ Погодные условия стабильны"

    }
}

const mapBlock = document.getElementById("kazakhstanMap");

if (mapBlock && typeof L !== "undefined") {
    const map = L.map("kazakhstanMap").setView([48.0, 67.0], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "© OpenStreetMap"
    }).addTo(map);

    const stations = [
        {
            name: "ПС 500 кВ Алма",
            coords: [43.25, 76.95],
            address: "Алматинская область, район Алматы",
            region: "Алматинская область",
            voltage: "500 кВ",
            power: "1000 МВА",
            level: "Системообразующая подстанция",
            equipment: "Силовые трансформаторы, выключатели 500 кВ, РЗА, АСУ ТП",
            status: "В работе",
            load: "72%",
            risk: "Средний",
            wiki: "Алма-Ата"
        },
        {
            name: "ПС 500 кВ Шу",
            coords: [43.60, 73.76],
            address: "Жамбылская область, район города Шу",
            region: "Жамбылская область",
            voltage: "500 кВ",
            power: "750 МВА",
            level: "Межрегиональная подстанция",
            equipment: "Трансформаторы 500/220 кВ, выключатели, ОПН, цифровые терминалы РЗА",
            status: "В работе",
            load: "68%",
            risk: "Низкий",
            wiki: "Шу_(город)"
        },
        {
            name: "ПС Караганда",
            coords: [49.80, 73.10],
            address: "Карагандинская область, район Караганды",
            region: "Карагандинская область",
            voltage: "220/500 кВ",
            power: "900 МВА",
            level: "Центральный энергетический узел",
            equipment: "Силовые трансформаторы, секционные выключатели, устройства РЗА и телемеханики",
            status: "В работе",
            load: "81%",
            risk: "Средний",
            wiki: "Караганда"
        },
        {
            name: "ПС Астана",
            coords: [51.16, 71.47],
            address: "город Астана, столичный энергорайон",
            region: "Астана",
            voltage: "220 кВ",
            power: "630 МВА",
            level: "Городская питающая подстанция",
            equipment: "Трансформаторы 220/110 кВ, ячейки КРУЭ, SCADA, РЗА",
            status: "В работе",
            load: "63%",
            risk: "Низкий",
            wiki: "Астана"
        },
        {
            name: "ПС Шымкент",
            coords: [42.30, 69.59],
            address: "город Шымкент, южный промышленный район",
            region: "Шымкент",
            voltage: "220 кВ",
            power: "500 МВА",
            level: "Региональная распределительная подстанция",
            equipment: "Силовые трансформаторы, вводные выключатели, защита линий, АСУ ТП",
            status: "В работе",
            load: "76%",
            risk: "Средний",
            wiki: "Шымкент"
        }
    ];

  stations.forEach(station => {
    const marker = L.marker(station.coords, {
        interactive: true,
        riseOnHover: true
    }).addTo(map);

    marker.bindPopup(`
        <b>${station.name}</b><br>
        ${station.voltage}<br>
        ${station.region}<br><br>
        <button class="station-popup-btn">Показать данные</button>
    `);

    marker.on("popupopen", () => {
        const btn = document.querySelector(".station-popup-btn");

        if (btn) {
            btn.onclick = () => {
                document.getElementById("stationInfo").innerHTML = `
                    <h3>${station.name}</h3>

                    <table class="station-table">
                        <tr><td>Адрес</td><td>${station.address}</td></tr>
                        <tr><td>Регион</td><td>${station.region}</td></tr>
                        <tr><td>Класс напряжения</td><td>${station.voltage}</td></tr>
                        <tr><td>Установленная мощность</td><td>${station.power}</td></tr>
                        <tr><td>Уровень объекта</td><td>${station.level}</td></tr>
                        <tr><td>Оборудование</td><td>${station.equipment}</td></tr>
                        <tr><td>Статус</td><td>${station.status}</td></tr>
                        <tr><td>Текущая загрузка</td><td>${station.load}</td></tr>
                        <tr><td>Риск</td><td>${station.risk}</td></tr>
                    </table>
                `;
            };
        }
    });
});

setTimeout(() => {
    map.invalidateSize();
}, 300);
}
function showStationInfo(key) {
    const data = {
        alma: [
            "ПС 500 кВ Алма",
            "Алматинская область",
            "500 кВ",
            "1000 МВА",
            "Системообразующая подстанция"
        ],

        shu: [
            "ПС 500 кВ Шу",
            "Жамбылская область",
            "500 кВ",
            "750 МВА",
            "Межрегиональная подстанция"
        ],

        karaganda: [
            "ПС Караганда",
            "Карагандинская область",
            "220/500 кВ",
            "900 МВА",
            "Центральный энергетический узел"
        ],

        astana: [
            "ПС Астана",
            "Астана",
            "220 кВ",
            "630 МВА",
            "Городская питающая подстанция"
        ],

        shymkent: [
            "ПС Шымкент",
            "Шымкент",
            "220 кВ",
            "500 МВА",
            "Региональная распределительная подстанция"
        ]
    };

    const s = data[key];

    document.getElementById("stationInfo").innerHTML = `
        <h3>${s[0]}</h3>

        <table class="station-table">
            <tr><td>Регион</td><td>${s[1]}</td></tr>
            <tr><td>Класс напряжения</td><td>${s[2]}</td></tr>
            <tr><td>Мощность</td><td>${s[3]}</td></tr>
            <tr><td>Уровень</td><td>${s[4]}</td></tr>
            <tr><td>Статус</td><td>В работе</td></tr>
            <tr><td>Риск</td><td>Средний</td></tr>
        </table>
    `;
}
function showDeviceInfo(type) {
    const devices = {
        line: ["ЛЭП 500 кВ", "Передача электроэнергии от внешней сети", "U = 500 кВ", "I = 620 А", "Состояние: норма"],
        disconnect: ["QS1 Разъединитель", "Создает видимый разрыв цепи при ремонте", "Положение: включен", "Команда: ручное/дистанционное", "Состояние: норма"],
        ct: ["ТТ Трансформатор тока", "Передает измеренный ток в устройства РЗА", "I первичный = 620 А", "I вторичный = 5 А", "Состояние: норма"],
        breaker: ["Q1 Выключатель", "Отключает поврежденный участок сети", "Положение: включен", "Ресурс: 86%", "Риск: средний"],
        vt: ["ТН Трансформатор напряжения", "Передает напряжение в измерение и защиту", "U первичное = 500 кВ", "U вторичное = 100 В", "Состояние: норма"],
        transformer: ["T1 Силовой трансформатор", "Преобразует напряжение 500/110 кВ", "Мощность: 1000 МВА", "Температура масла: 62°C", "Нагрузка: 72%"],
        bus: ["Шины 110 кВ", "Распределяют электроэнергию по отходящим линиям", "U = 110 кВ", "Секция: №1", "Состояние: норма"],
        feeder: ["Фидер 10 кВ", "Питает распределительную сеть", "U = 10 кВ", "I = 240 А", "Состояние: норма"],
        load: ["Нагрузка", "Потребители электроэнергии", "P = 42 МВт", "cosφ = 0.92", "Состояние: стабильное"]
    };

    const d = devices[type];

    document.getElementById("deviceInfo").innerHTML = `
        <h3>${d[0]}</h3>
        <p><b>Назначение:</b> ${d[1]}</p>
        <table class="station-table">
            <tr><td>Параметр 1</td><td>${d[2]}</td></tr>
            <tr><td>Параметр 2</td><td>${d[3]}</td></tr>
            <tr><td>Диагностика</td><td>${d[4]}</td></tr>
            <tr><td>AI-рекомендация</td><td>Продолжить мониторинг, отклонений критического уровня не выявлено.</td></tr>
        </table>
    `;
}
function addEmployee() {
    const name = document.getElementById("employeeName").value;
    const role = document.getElementById("employeeRole").value;
    const status = document.getElementById("employeeStatus").value;

    if (!name || !role) {
        alert("Заполните ФИО и должность");
        return;
    }

    const list = document.getElementById("employeeList");

    const card = document.createElement("div");
    card.className = "employee-card";

    card.innerHTML = `
        <h3>${name}</h3>
        <p>${role}</p>
        <span class="status">${status}</span>
        <button onclick="this.parentElement.remove()">Удалить</button>
    `;

    list.appendChild(card);

    document.getElementById("employeeName").value = "";
    document.getElementById("employeeRole").value = "";
}
document.addEventListener("DOMContentLoaded", function () {
    loadWeather();
});