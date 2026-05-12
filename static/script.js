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

