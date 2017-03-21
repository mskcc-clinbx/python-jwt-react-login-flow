from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt

app = Flask(__name__)
CORS(app)

def decodeAuthToken(token):
    try:
        payload = jwt.decode(token, 'super-secret-key', algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Login please'
    except jwt.InvalidTokenError:
        return 'Nice try, invalid token. Login please'


@app.route('/test_get_with_validation')
def testGetWithValidation():
    auth_header = request.headers.get('Authorization')
    if auth_header:
        token = auth_header.split(" ")[1] # Parses out the "Bearer" portion
    else:
        token = ''

    if token:
        decoded = decodeAuthToken(token)
        if not isinstance(decoded, str):
            if decoded['admin']:
                return jsonify('You Are a Real Admin!!')
            else:
                return jsonify('You Are not an Admin, but at least your token is valid!')
        else:
            return jsonify('Ooops, validation messed up: ' + decoded), 401

    return jsonify('hello')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
