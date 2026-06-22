from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import os
import requests

load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN")
CHAT_ID = os.getenv("CHAT_ID")

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/send", methods=["POST"])
def send():

    data = request.json

    name = data.get("name")
    phone = data.get("phone")
    message = data.get("message")
    cart = data.get("cart", [])

    text = f"""
🌹 Новый заказ

👤 Имя: {name}
📞 Телефон: {phone}
💬 Комментарий: {message}

🛒 Товары:
"""

    total = 0

    for item in cart:
        text += f"\n• {item['name']} — {item['price']} ₽"
        total += item["price"]

    text += f"\n\n💰 Итого: {total} ₽"

    response = requests.post(
        f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
        json={
            "chat_id": CHAT_ID,
            "text": text
        }
    )

    return jsonify({
        "success": response.status_code == 200
    })


if __name__ == "__main__":
    app.run(debug=True)