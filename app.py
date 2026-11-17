from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/contacto', methods=['POST'])
def contacto():
    data = request.get_json()
    nombre = data.get('nombre')
    telefono = data.get('telefono')
    servicio = data.get('servicio')
    
    print(f"Nuevo turno recibido - Paciente: {nombre}, Teléfono: {telefono}, Servicio: {servicio}")
    
    return jsonify({
        "status": "success", 
        "message": f"¡Gracias {nombre}! Su turno para {servicio} ha sido registrado con éxito. Nos comunicaremos al {telefono} para confirmar el horario."
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)