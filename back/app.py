from flask import Flask, request, jsonify
from models import db, Registration
import config
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(config)
CORS(app)

db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    required_fields = ['org', 'fio', 'phone', 'email']

    # Проверяем заполнение обязательных полей
    if not data or not all(field in data and data[field].strip() for field in required_fields):
        return jsonify({'error': 'Пожалуйста, заполните все обязательные поля.'}), 400

    # Можно добавить дополнительную валидацию (например, email, телефон)

    # Сохраняем заявку (в реальном проекте — в БД)
    pending_registrations.append(data)

    # Здесь можно добавить отправку уведомления админу
    # или отправку email, или сообщение в Telegram

    return jsonify({'message': 'Заявка успешно отправлена!'}), 200

if __name__ == '__main__':
    app.run(debug=True)