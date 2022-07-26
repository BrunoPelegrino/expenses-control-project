import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpenseAction } from '../actions';

class Table extends React.Component {
handleClick = (id) => {
  const { removeExpense } = this.props;
  removeExpense(id);
}

render() {
  const { expenses } = this.props;
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
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
        {
          expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>
                { expense.id }
              </td>
              <td>
                { expense.description }
              </td>
              <td>
                { expense.tag }
              </td>
              <td>
                { expense.method }
              </td>
              <td>
                { Number(expense.value).toFixed(2) }
              </td>
              <td>
                { expense.exchangeRates[expense.currency].name }
              </td>
              <td>
                { Number(expense
                  .exchangeRates[expense.currency].ask).toFixed(2) }

              </td>
              <td>
                { Number((expense.value) * expense
                  .exchangeRates[expense.currency].ask).toFixed(2) }

              </td>
              <td>Real</td>
              <td>
                <button type="button">
                  Editar
                </button>
              </td>
              <td>
                <button
                  type="button"
                  onClick={ () => this.handleClick(expense.id) }
                  data-testid="delete-btn"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
}

const mapStateToProps = (state) => ({
  // currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(removeExpenseAction(id)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
