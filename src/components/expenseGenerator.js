import PropTypes from 'prop-types';
import React from 'react';

class ExpenseGenerator extends React.Component {
  render() {
    const {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
      deleteTask,
      toEdit,
    } = this.props;
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
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => deleteTask(id) }
            // value={ id }
          >
            Excluir
          </button>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => toEdit(id) }
          >
            Editar
          </button>
        </td>
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
