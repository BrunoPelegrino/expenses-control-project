import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addEmail } from '../actions';
import './index.css'

class Login extends React.Component {
  state = {
    buttonDisabled: true,
    email: '',
    password: '',
  };

  emailValidate = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  buttonValidate = () => {
    const { password, email } = this.state;
    const valid = 6;
    if (password.length >= valid && this.emailValidate(email) === true) {
      this.setState({ buttonDisabled: false });
    } else this.setState({ buttonDisabled: true });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value }, this.buttonValidate);
  }

  handleClick = () => {
    const { email } = this.state;
    const { dispatchEmail } = this.props;
    dispatchEmail(email);
  }

  render() {
    const { buttonDisabled, email, password } = this.state;
    return (
      <div>
        <label htmlFor="email-input">
          Login:
          <input
            onChange={ this.handleChange }
            name="email"
            data-testid="email-input"
            type="email"
            email={ email }
            required
          />
        </label>
        <label htmlFor="password-input">
          Password:
          <input
            onChange={ this.handleChange }
            name="password"
            data-testid="password-input"
            type="password"
            password={ password }
            required
          />
        </label>
        <Link to="/carteira">
          <button
            disabled={ buttonDisabled }
            type="submit"
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  dispatchEmail: PropTypes.object,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(addEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
