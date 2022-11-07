import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../redux/actions';
import '../css/Login.css';

class Login extends React.Component {
  state = {
    emailInput: '',
    isDisabled: true,
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.handleValidation);
  };

  handleValidation = () => {
    const { emailInput, password } = this.state;
    const regex = /\S+@\S+\.\S+/i;
    const SIX = 6;
    if (regex.test(emailInput) && password.length >= SIX) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  saveUser = (userEmail) => {
    const { history, dispatch } = this.props;
    dispatch(getUser(userEmail));
    history.push('/carteira');
  };

  render() {
    const { isDisabled, emailInput } = this.state;
    return (
      <form>
        <section className="login-form">
          <h2>Inciar sessão</h2>
          <div className="inputs">
            <label htmlFor="email-input">
              E-mail:
              <input
                className="email-input"
                name="emailInput"
                id="email-input"
                type="text"
                data-testid="email-input"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="password-input">
              Senha:
              <input
                className="password-input"
                name="password"
                id="password-input"
                type="password"
                data-testid="password-input"
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <button
            type="button"
            onClick={ () => this.saveUser(emailInput) }
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </section>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
