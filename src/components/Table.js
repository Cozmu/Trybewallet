import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpenseGenerator from './expenseGenerator';
import { withdrawExpense, targetID } from '../redux/actions';

class Table extends Component {
  toEdit = (id) => {
    const { dispatch } = this.props;
    dispatch(targetID(id));
  };

  deleteTask = (id) => {
    const { expenses, dispatch } = this.props;
    const newExpense = expenses.filter((e) => e.id !== id);
    dispatch(withdrawExpense(newExpense));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.length > 0 && expenses.map((element) => (
              <tr key={ element.id }>
                <ExpenseGenerator
                  toEdit={ this.toEdit }
                  deleteTask={ this.deleteTask }
                  { ...element }
                />
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape({
    forEach: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
