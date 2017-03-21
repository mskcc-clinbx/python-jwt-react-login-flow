import React from 'react';
import { withRouter } from 'react-router';
import './login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  onChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  clearLogin = () => {
    this.setState({
      email: '',
      password: '',
    });
  }

  sendLoginInformation = (email, password) => {
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
        router.push('/success')
      }
    })
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="auth-container">
        <div className="logo">
          <h3 className="demo">Demo Auth Site</h3>
        </div>
        <div className="auth-input-holder">
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
        </div>
        <div className="auth-button">
            <button
            className="auth-button-go"
            onClick={() => this.sendLoginInformation(email, password)}
            >
              Proceed
            </button>
        </div>
      </div>
    )
  }
};

export default withRouter(Login);
