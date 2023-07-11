from flask import Flask
from flask_mysqldb import MySQL
from flask import Flask, render_template, request, session, redirect, url_for
import config

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'plaza'
app.config['MYSQL_PASSWORD'] = 'fitness'
app.config['MYSQL_DB'] = 'plaza3dev'
app.config["SECRET_KEY"] = config.HEX_SEC_KEY

mysql = MySQL(app)

@app.route('/loginProcesar', methods=["POST"])
def loginpro():
    email = request.form["email"]
    password = request.form["password"]

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM user WHERE username = %s", {email})
    user = cur.fetchone()
    cur.close()

    if user is None:
        return render_template("index.html", message="Usuario o contraseña incorrectos")    

    if user[2] != password:
        return render_template("index.html", message="Usuario o contraseña incorrectos")

    session["email"] = user[1]
    return render_template('index.html', message="Logueamo vien papa!")

@app.route('/logout')
def logout():
    session.clear()

    return redirect(url_for('login'))

@app.route('/login')
def login():
    return render_template('authentication-login.html')

@app.route('/')
def index():
    return render_template('index.html')
