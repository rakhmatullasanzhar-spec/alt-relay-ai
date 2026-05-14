from flask import Flask, render_template, request, jsonify
import requests
import google.generativeai as genai
app = Flask(__name__)
GEMINI_API_KEY = "AIzaSyB4oHPQC2FPufmPOs4rvPA859W0RAkPDok"
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/ai", methods=["POST"])
def ai():
    data = request.get_json()
    question = data.get("question", "")

    try:
        response = model.generate_content(
            f"""
            Ты профессиональный инженер РЗА, SCADA и подстанций.
            Отвечай кратко и технически грамотно.

            Вопрос:
            {question}
            """
        )

        return jsonify({
            "answer": response.text
        })

    except Exception:
        question_lower = question.lower()

    if "коротк" in question_lower or "замык" in question_lower:
        answer = """
        Обнаружено короткое замыкание.

        Действия:
        1. Отключить поврежденную линию
        2. Проверить релейную защиту
        3. Включить резервное питание
        4. Проверить ток КЗ
        """

    elif "трансформатор" in question_lower:
        answer = """
        Обнаружен риск аварии трансформатора.

        Действия:
        1. Проверить температуру
        2. Проверить масло
        3. Проверить нагрузку
        4. Выполнить диагностику
        """

    elif "напряжение" in question_lower:
        answer = """
        Отклонение напряжения от нормы.

        Действия:
        1. Проверить линию
        2. Проверить нагрузку
        3. Проверить SCADA данные
        """

    else:
        answer = f"""
        Система анализирует запрос: {question}

        Рекомендация:
        Проверить оборудование подстанции.
        """

    return jsonify({
        "answer": answer
    })
@app.route("/weather")
def weather():
    try:
        url = "https://api.open-meteo.com/v1/forecast?latitude=43.25&longitude=76.95&current_weather=true"

        response = requests.get(url, timeout=10)
        data = response.json()

        return jsonify(data)

    except Exception as e:
        return jsonify({
            "error": str(e)
        })
@app.route("/api/wiki")
def wiki_info():
    title = request.args.get("title", "")

    url = f"https://ru.wikipedia.org/api/rest_v1/page/summary/{title}"

    try:
        response = requests.get(url, timeout=5)
        data = response.json()

        summary = data.get("extract", "Информация не найдена.")

        return jsonify({
            "summary": summary
        })

    except Exception:
        return jsonify({
            "summary": "Не удалось загрузить информацию из Wikipedia."
        })
if __name__ == "__main__":
    app.run(debug=True)