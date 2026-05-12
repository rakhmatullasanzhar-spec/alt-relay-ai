from flask import Flask, render_template, request, jsonify
import requests
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/ai", methods=["POST"])
def ai():
    data = request.get_json()
    question = data.get("question", "").lower()

    if "кз" in question or "корот" in question:
        answer = "При коротком замыкании система рекомендует проверить токовую отсечку, МТЗ, выключатель Q1, осциллограмму аварии и отключение повреждённого участка."
    elif "трансформ" in question or "перегрев" in question:
        answer = "По трансформатору нужно проверить температуру, газовую защиту, дифференциальную защиту, уровень нагрузки и возможность перевода нагрузки на резервный трансформатор."
    elif "scada" in question or "скада" in question:
        answer = "SCADA показывает параметры и сигналы. Данная система является AI-надстройкой: анализирует данные, объясняет причину аварии, выдаёт рекомендации и отправляет уведомления инженеру."
    elif "iec" in question or "61850" in question:
        answer = "IEC 61850 нужен для цифрового обмена данными между IED-устройствами, РЗА, SCADA и уровнем управления цифровой подстанции."
    elif "авр" in question:
        answer = "АВР автоматически включает резервный источник питания при потере основного питания. В системе можно контролировать статус АВР и получать уведомления."
    else:
        answer = "AI рекомендация: проверьте ток, напряжение, частоту, температуру трансформатора, состояние выключателей, журнал событий и последние срабатывания РЗА."

    return jsonify({"answer": answer})
@app.route("/weather")
def weather():

    url = "https://api.open-meteo.com/v1/forecast?latitude=43.25&longitude=76.95&current_weather=true"

    data = requests.get(url).json()

    return jsonify(data)
if __name__ == "__main__":
    app.run(debug=True)