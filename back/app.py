from flask import Flask, request, jsonify
from flask import render_template, redirect, url_for
from models import db, Registration, Beer
import config
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash


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
    required_fields = ['company_name', 'contact_name', 'email', 'phone', 'password']
    if not data or not all(field in data and data[field].strip() for field in required_fields):
        return jsonify({'error': 'Пожалуйста, заполните все обязательные поля.'}), 400

    password = data.get('password')
    if not password or len(password) < 6:
        return jsonify({'error': 'Пароль должен быть не менее 6 символов.'}), 400

    hashed_password = generate_password_hash(password)  # вот здесь убран лишний отступ

    # Сохранение в БД
    reg = Registration(
        company_name=data['company_name'],
        contact_name=data['contact_name'],
        email=data['email'],
        phone=data['phone'],
        password=hashed_password,
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

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Введите email и пароль'}), 400

    user = Registration.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'Пользователь не найден'}), 404

    if not user.approved:
        return jsonify({'error': 'Аккаунт не подтвержден администратором'}), 403

    if not check_password_hash(user.password, password):
        return jsonify({'error': 'Неверный пароль'}), 401

    # Можно создать сессию или токен (зависит от задачи)
    return jsonify({'message': 'Успешный вход', 'user': {'company_name': user.company_name, 'contact_name': user.contact_name, 'email': user.email}}), 200


@app.route('/api/beers', methods=['GET'])
def get_beers():
    beers = Beer.query.all()
    return jsonify([{
        'id': beer.id,
        'name': beer.name,
        'description': beer.description,
        'style': beer.style,
        'abv': beer.abv,
        'volume': beer.volume
    } for beer in beers])

@app.route('/api/beers', methods=['POST'])
def add_beer():
    data = request.get_json()
    new_beer = Beer(
        name=data['name'],
        description=data['description'],
        style=data['style'],
        abv=data['abv'],
        volume=data['volume']
    )
    db.session.add(new_beer)
    db.session.commit()
    return jsonify({'message': 'Пиво добавлено успешно'}), 201

@app.route('/api/beers/<int:beer_id>', methods=['DELETE'])
def delete_beer(beer_id):
    beer = Beer.query.get_or_404(beer_id)
    db.session.delete(beer)
    db.session.commit()
    return jsonify({'message': 'Пиво удалено успешно'})

