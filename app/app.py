from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'success',
        'message': 'OK Inteligência Artificial API is running'
    })

@app.route('/api/test', methods=['POST'])
def test_endpoint():
    try:
        data = request.get_json()
        return jsonify({
            'status': 'success',
            'message': 'Request received successfully',
            'data': data
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
