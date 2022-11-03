import PropTypes from 'prop-types';
import React from 'react';

class ExpenseGenerator extends React.Component {
  render() {
    const { value, currency, method, tag, description, exchangeRates } = this.props;
    const nomeMoeda = exchangeRates[currency].name;
    const CambioUtilizado = +exchangeRates[currency].ask;
    const valorConvertido = exchangeRates[currency].ask * value;
    const valorInvestido = +value;
    return (
      <>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{valorInvestido.toFixed(2)}</td>
        <td>{nomeMoeda}</td>
        <td>{CambioUtilizado.toFixed(2)}</td>
        <td>{valorConvertido.toFixed(2)}</td>
        <td>Real</td>
        <td>{}</td>
      </>
    );
  }
}

ExpenseGenerator.propTypes = {
  currency: PropTypes.any,
  description: PropTypes.any,
  exchangeRates: PropTypes.any,
  method: PropTypes.any,
  tag: PropTypes.any,
  value: PropTypes.any,
}.isRequired;

export default ExpenseGenerator;
