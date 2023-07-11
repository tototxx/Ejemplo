from flask import Flask
from flask_mysqldb import MySQL
from flask import Flask, render_template, request, session, redirect, url_for
import config

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'diosseapp'
app.config["SECRET_KEY"] = config.HEX_SEC_KEY

mysql = MySQL(app)

@app.route('/loginProcesar', methods=["POST"])
def loginpro():
    email = request.form["email"]
    password = request.form["password"]

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM empleados WHERE correo =%s AND contraseña =%s", (email,password,))
    user = cur.fetchone()
    cur.close()

    if user is None:
        return render_template("authentication-login.html", message="Usuario o contraseña incorrectos")    

 

    session["email"] = user[4]

    return redirect(url_for('index'))

@app.route('/logout')
def logout():
    session.clear()

    return redirect(url_for('index'))

@app.route('/login')
def login():
    return render_template('authentication-login.html')

@app.route('/')
def index():

    if not session:
        return render_template('authentication-login.html')
    return render_template('index.html')


@app.route('/personal')
def personal():
    cur = mysql.connection.cursor()
    cur.execute("SELECT nombre, rol,correo, dni FROM empleados where estado = 'a' ")
    data = cur.fetchall()
    cur.close()
    return render_template('personal.html', personal=data)

# @app.route("/new-usuario", methods=["POST"])
# def newusuario():
#     if session["user_type"].lower() not in ("admin",):
#         return redirect("/")
    


#     username = request.form["email"].strip().lower()
#     password = request.form["clave"]
#     password2 = request.form["clave2"]


#     nombre = string.capwords(request.form["nombre"].strip())
#     apellido = string.capwords(request.form["apellido"].strip())

    
#     rol = request.form["rol"].strip().lower()

#     if (
#         not username
#         or not password
#         or not password2
#         or not nombre
#         or not apellido
#         or not rol
#     ):
#         return redirect(url_for("viewusuarios", error="Campos incompletos o vacios."))
#     if rol not in ("admin", "secretaria", "recepcionista"):
#         return redirect(url_for("viewusuarios", error="Rol invalido."))
#     if password != password2:
#         return redirect(url_for("viewusuarios", error="Contraseñas diferentes."))
#     if not re.match(r"[^@]+@[^@]+\.[^@]+", username):
#         return redirect(url_for("viewusuarios", error="Email invalido."))

#     cur = mysql.connection.cursor()
#     cur.execute("SELECT * FROM user WHERE username = %s", (username,))
#     if cur.fetchone():
#         return redirect(url_for("viewusuarios", error="Usuario ya existente."))

#     hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
#     cur.execute(
#         "INSERT INTO user (username, contraseña, nombre, apellido, role) VALUES (%s, %s, %s, %s, %s)",
#         (username, hashed_password, nombre, apellido, rol),
#     )
#     mysql.connection.commit()
#     return redirect(url_for("viewusuarios", message="Usuario creado correctamente."))


# @app.route('/personal/agregar')
# def personalregistro():
#     return render_template('index.html')
# @app.route('/personal/actualizar')
# def personalregistro():
#     return render_template('index.html')
# @app.route('/personal/eliminar')
# def personalregistro():
#     return render_template('index.html')
# @app.route('/personal/editar')
# def personalregistro():
#     return render_template('index.html')

