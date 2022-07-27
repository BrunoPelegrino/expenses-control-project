import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addEmail } from '../actions';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import LoginTitle from '../components/LoginTitle';

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
      <Form>
      <div className="title">
        <LoginTitle />
      </div>
      <div className="login">
        <Row className="align-items-center">
        <Col xs="auto">
        <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
          Login:
        </Form.Label>
          <InputGroup className="mb-5">
          <InputGroup.Text>@</InputGroup.Text>
          <Form.Control
            id="inlineFormInputGroup"
            placeholder="Username"
            onChange={ this.handleChange }
            name="email"
            data-testid="email-input"
            type="email"
            email={ email }
            required
          />
          </InputGroup>

        </Col>
        <Col xs="auto">
        <Form.Label htmlFor="inlineFormInput" visuallyHidden>
          Password:
          </Form.Label>
          <Form.Control
            className="mb-5"
            id="inlineFormInput"
            placeholder="Password"
            onChange={ this.handleChange }
            name="password"
            data-testid="password-input"
            type="password"
            password={ password }
            required
          />
        </Col>
        <Link to="/carteira">
          <Col xs="auto">
          <Button className="mb-3"
            disabled={ buttonDisabled }
            type="submit"
            onClick={ this.handleClick }
          >
            Entrar
          </Button>
          </Col>
        </Link>
        </Row>
      </div>
      </Form>
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
