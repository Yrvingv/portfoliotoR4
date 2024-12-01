from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mail import Mail, Message

app = Flask(__name__)
app.secret_key = 'isabellaV12'  # Cambia esto a una clave secreta segura

# Configuración del correo
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'yrving.viera@gmail.com'  # Reemplaza con tu correo
app.config['MAIL_PASSWORD'] = 'jmpn yctp qeac kdgc'  # Reemplaza con tu contraseña
app.config['MAIL_DEFAULT_SENDER'] = 'yrving.viera@gmail.com'

mail = Mail(app)  # Inicializa el servicio de correo

@app.route('/send_message', methods=['POST'])
def send_message():
    fullname = request.form['fullname']
    email = request.form['email']
    message = request.form['message']
    
    msg = Message('Nuevo mensaje de contacto', recipients=['yrving.viera@gmail.com'])
    msg.body = f"Nombre: {fullname}\nCorreo: {email}\nMensaje: {message}"
    mail.send(msg)
    
    flash('Mensaje enviado con éxito')
    return redirect(url_for('home'))






# Ruta para la página principal

@app.route('/')
def home():
    return render_template('index.html', active_page="about")

# Rutas para las hojas de los proyectos llamados desde index.html
@app.route('/project1')
def project1():
    return render_template('project1.html')


@app.route('/project2')
def project2():
    return render_template('project2.html')


@app.route('/project3')
def project3():
    return render_template('project3.html')


@app.route('/project4')
def project4():
    return render_template('project4.html')

@app.route('/project5')
def project5():
    return render_template('project5.html')

@app.route('/blog/articulo1')
def articulo1():
    return render_template('blog1articulo.html')

@app.route('/blog')
def blog():
    return render_template('index.html', active_page="blog")

if __name__ == '__main__':
    app.run(debug=False)