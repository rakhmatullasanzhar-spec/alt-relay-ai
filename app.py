from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("dashboard.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/ai", methods=["POST"])
def ai():
    data = request.get_json()
    question = data.get("question", "").lower()

    if "кз" in question or "корот" in question:
        answer = "При коротком замыкании система рекомендует проверить защиту линии."
    elif "трансформ" in question or "перегрев" in question:
        answer = "Проверьте температуру трансформатора и систему охлаждения."
    else:
        answer = "AI анализ завершен. Система работает стабильно."

    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(debug=True)