import React from 'react';
import { getToken } from '../authentication';
import Modal from '../Modal';
import './Success.css';
import { sendLoginInformation } from '../Login';

class Success extends React.Component {
  state = {
    status: '',
    authModal: false,
    secondsElapsed: 0,
    email: '',
    password: '',
  }

  componentDidMount() {
    this.validateTokenViaGet();
    this.interval = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState((prevState) => ({
      secondsElapsed: prevState.secondsElapsed + 1
    }));
    if(this.state.secondsElapsed % 10 == 0 && !this.props.authModal) {
      this.validateTokenViaGet();
    }
  }

  onChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  validateTokenViaGet() {
    const API_HEADERS_AND_MODE = {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      mode: 'cors',
    };

    const API_SETTINGS = {
      settings: {
        method: 'GET'
      }
    };

    return fetch('http://localhost:5001/test_get_with_validation', {
      ...API_HEADERS_AND_MODE,
      ...API_SETTINGS
    }).then(res => {
      if (res.status >= 400) {
        this.setState({
          authModal: true
        });
        return res.json().then(err => {
          throw err;
        });
      }
      this.setState({
        authModal: false,
      });
      return res.json();
    }).then(data => {
      this.setState({
        status: data,
      });
    })
  }

  reAuthenticate = (email, password) => {
      const { router } = this.props;
      const API_HEADERS_AND_MODE = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
      };

      const API_SETTINGS = {
        settings: {
          method: 'POST',
          body: JSON.stringify({
            username: email,
            password: password
          })
        }
      }

      return fetch('http://localhost:5000/auth/login', {
        ...API_HEADERS_AND_MODE,
        ...API_SETTINGS.settings
      }).then(res => {
        if (res.status >= 400) {
          return res.json().then(err => {
            throw err;
          });
        }
        return res.json();
      }).then(data => {
        localStorage.setItem('token', data.result.auth_token)
        if (!!localStorage.token) {
          this.setState({
            authModal: false
          })
          router.push('/success')
        }
      })
    }

  render() {
    const token = getToken();
    const { status, email, password } = this.state;
    return (
      <div>
        <div>
          <h2> Your token is: </h2>
          <h1>{token}</h1>
        </div>
        <h3>Your Status: {status}</h3>
        <Modal visible={this.state.authModal}>
          <div className="auth-modal-holder">
            <div className="email-icon" />
              <input
                type="text"
                id="email"
                placeholder="Email"
                className="email"
                value={this.state.email}
                onChange={this.onChange}
              />
            <div className="password-icon" />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <button onClick={() => this.reAuthenticate(email, password)}>Login </button>
          </div>
        </Modal>
      </div>
    )
  }
}
export default Success;
