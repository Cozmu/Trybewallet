import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCoins, saveExpense } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    id: 0,
    valueInput: '',
    currencyInput: '',
    methodInput: '',
    tagInput: '',
    descriptionInput: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoins());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  addExpense = () => {
    const { dispatch } = this.props;
    dispatch(saveExpense(this.state));
    this.setState((prev) => ({
      id: prev.id + 1,
      valueInput: '',
      descriptionInput: '',
    }));
  };

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="valueInput">
          Valor:
          <input
            type="number"
            id="valueInput"
            name="valueInput"
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currencyInput">
          Moeda:
          <select
            id="currencyInput"
            name="currencyInput"
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
            name="methodInput"
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
            name="tagInput"
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
            name="descriptionInput"
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
