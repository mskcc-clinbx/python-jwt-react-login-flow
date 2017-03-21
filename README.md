### Getting set up

First, fork or clone this repository

### Authentication Server
1. ```cd authentication_server``` then, ```pip install -r requirements.txt```
2. ```python server.py```

### API
1. ```cd api```, then, ```pip install -r requirements.txt```
2. ```python run.py```
3. If all is successful the server should be running at localhost:5001

### Frontend
1. ```cd app```, then, ```npm install```
2. To run, ```npm run dev```
3. Server should be running at localhost:3000


### Usage

There are only two users currently set up for this contrived example and they are hardcoded into the authentication server, as you can see below.

```python
  valid_user_1 = {'username': "test_user_1", 'password': 'Happy123'}
  valid_user_2 = {'username': 'test_admin', 'password': 'LessHappy123'}
```

More docs to come...
