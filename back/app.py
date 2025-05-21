from flask import Flask, request, jsonify
from flask import render_template, redirect, url_for
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

    # Проверка на заполненность
    required_fields = ['company_name', 'contact_name', 'email', 'phone']
    if not data or not all(field in data and data[field].strip() for field in required_fields):
        return jsonify({'error': 'Пожалуйста, заполните все обязательные поля.'}), 400

    # Сохранение в БД
    reg = Registration(
        company_name=data['company_name'],
        contact_name=data['contact_name'],
        email=data['email'],
        phone=data['phone'],
        approved=False
    )
    db.session.add(reg)
    db.session.commit()

    return jsonify({'message': 'Заявка успешно сохранена!'}), 200


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

@app.route('/admin')
def admin():
    regs = Registration.query.all()
    return render_template('admin.html', registrations=regs)

@app.route('/approve/<int:reg_id>')
def approve(reg_id):
    reg = Registration.query.get_or_404(reg_id)
    reg.approved = True
    db.session.commit()
    return redirect(url_for('admin'))

if __name__ == '__main__':
    app.run(debug=True)