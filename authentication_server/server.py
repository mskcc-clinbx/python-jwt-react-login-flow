from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
import datetime

app = Flask(__name__)
CORS(app)

def encodeAuthToken(user_id, groups=[]):
    try:
        admin = True if 'admin' in groups else False

        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=60),
            'iat': datetime.datetime.utcnow(),
            'sub': user_id,
            'admin': admin
        }
        token = jwt.encode(payload, 'super-secret-key', algorithm='HS256')
        return token
    except Exception as e:
        print e
        return e


@app.route('/auth/login', methods=['POST'])
def loginAndGenerateToken():
    valid_user_1 = {'username': "test_user_1", 'password': 'Happy123'}
    valid_user_2 = {'username': 'test_admin', 'password': 'LessHappy123'}

    req_json = request.get_json()
    print req_json
    username = req_json['username']
    print username
    password = req_json['password']
    print password

    try:
        if username == valid_user_1['username'] and password == valid_user_1['password']:
            token = encodeAuthToken(1)

        if username == valid_user_2['username'] and password == valid_user_2['password']:
            token = encodeAuthToken(2, ['admin'])

        print token
        return jsonify(result = {
            'status': 'success',
            'auth_token': token
        })
    except Exception as e:
        return jsonify({
            'status': 'Failure',
            'error': e
        })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
