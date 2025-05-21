from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Registration(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(100), nullable=False)
    contact_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)  # желательно уникальность
    phone = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(128), nullable=False)  # новое поле для пароля (хешируем!)
    approved = db.Column(db.Boolean, default=False)

class Beer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    style = db.Column(db.String(50))
    abv = db.Column(db.Float)  # Крепость
    volume = db.Column(db.Float)  # Объем (например, 0.5)




