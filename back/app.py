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

    if not data or not all(field in data and data[field].strip() for field in required_fields):
        return jsonify({'error': 'Пожалуйста, заполните все обязательные поля.'}), 400


    pending_registrations.append(data)


    return jsonify({'message': 'Заявка успешно отправлена!'}), 200

@app.route('/all')
def all_regs():
    regs = Registration.query.all()
    return jsonify([{
        'id': r.id,
        'company': r.company_name,
        'contact': r.contact_name,
        'email': r.email,
        'phone': r.phone,
        'approved': r.approved
    } for r in regs])

if __name__ == '__main__':
    app.run(debug=True)