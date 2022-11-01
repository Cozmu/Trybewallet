import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    return total;
  };

  render() {
    const { emailField } = this.props;
    return (
      <div>
        <p
          data-testid="email-field"
        >
          {emailField}
        </p>
        <p
          data-testid="total-field"
        >
          {this.displayExpenses()}
        </p>
        <p
          data-testid="header-currency-field"
        >
          BRL
        </p>
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
