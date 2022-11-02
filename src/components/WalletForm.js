import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCoins, saveExpense } from '../redux/actions/index';
import getCoin from '../services/coinAPI';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoins());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  addExpense = async () => {
    const { dispatch } = this.props;
    const requirement = await getCoin();
    delete requirement.USDT;
    this.setState({ exchangeRates: requirement }, () => {
      dispatch(saveExpense(this.state));
      this.setState((prev) => ({
        id: prev.id + 1,
        value: '',
        description: '',
      }));
    });
  };

  render() {
    // const { description, value, currencies } = this.props;
    const { currencies } = this.props;
    const { description, value } = this.state;
    return (
      <form>
        <label htmlFor="valueInput">
          Valor:
          <input
            type="number"
            id="valueInput"
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currencyInput">
          Moeda:
          <select
            id="currencyInput"
            name="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {currencies.map((e) => (
              <option
                key={ e }
              >
                {e}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="methodInput">
          Categoria:
          <select
            id="methodInput"
            name="method"
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tagInput">
          Método de Pagamento:
          <select
            id="tagInput"
            name="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="descriptionInput">
          Descrição:
          <input
            type="text"
            id="descriptionInput"
            value={ description }
            name="description"
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          onClick={ () => this.addExpense() }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
