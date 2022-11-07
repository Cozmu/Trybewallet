import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/Header.css';
import logo from '../imgs/logo.png';
import moeda from '../imgs/Vector.png';
import usuario from '../imgs/usuario.png';

class Header extends Component {
  displayExpenses = () => {
    const { expenses } = this.props;
    let total = 0;
    if (expenses.length > 0) {
      expenses.forEach((e) => {
        const verificaMoeda = e.exchangeRates[e.currency].ask;
        const transacao = verificaMoeda * e.value;
        total += +transacao.toFixed(2);
      });
    }
    return total.toFixed(2);
  };

  render() {
    const { emailField } = this.props;
    return (
      <div className="header-container">
        <img className="logo" src={ logo } alt="logo" />
        <section className="gastos">
          <img className="moeda" src={ moeda } alt="moeda" />
          <p>
            Total de despesas:
          </p>
          <p
            data-testid="total-field"
            className="total-field"
          >
            {this.displayExpenses()}
          </p>
          <p
            data-testid="header-currency-field"
          >
            BRL
          </p>
        </section>
        <section className="usuario-container">
          <img src={ usuario } alt="usuario" />
          <p
            className="email-field"
            data-testid="email-field"
          >
            {emailField}
          </p>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailField: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  emailField: PropTypes.any,
}.isRequired;

export default connect(mapStateToProps)(Header);
