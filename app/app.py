from flask import Flask, request, jsonify

app = Flask(__name__)

# Define rota padrão para o caminho raiz e para qualquer outro caminho
@app.route('/', defaults={'path': ''}, methods=['GET', 'POST'])
@app.route('/<path:path>', methods=['GET', 'POST'])
def process_email(path):
    # Obtém o email via GET ou POST
    email = request.values.get('email')
    
    if email == "teste1@gmail.com":
        response = {"success": 1, "errno": 0, "error": ""}
    elif email == "teste2@gmail.com":
        response = {"success": 0, "errno": 1, "error": "Email nao encontrado"}
    else:
        # Resposta para emails que não sejam os especificados
        response = {"success": 0, "errno": 2, "error": "Email não reconhecido"}
    
    return jsonify(response)

if __name__ == '__main__':
    # A API rodará na porta HTTP 5000
    app.run(host='0.0.0.0', port=5000)
