import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpenseAction } from '../actions';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


class TableExpense extends React.Component {
handleClick = (id) => {
  const { removeExpense } = this.props;
  removeExpense(id);
}

render() {
  const { expenses } = this.props;
  return (
    <div>
    <Table striped bordered hover>
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
          <th>Editar</th>
          <th>Excluir</th>
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
                <Button variant="outline-info"
                type="button">
                  Editar
                </Button>
              </td>
              <td>
                <Button variant="outline-danger" 
                  type="button"
                  onClick={ () => this.handleClick(expense.id) }
                  data-testid="delete-btn"
                >
                  Excluir
                  </Button>{' '}
              </td>
            </tr>
            
          ))
          
        }
      </tbody>
    </Table>
      <div className="header-expense">
        <span>Despesa total: R$</span>
        <span data-testid="total-field">
          { expenses.reduce((acc, item) => {
            acc += +item.value * +(item.exchangeRates[item.currency].ask);
            return acc;
          }, 0).toFixed(2)}
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
        </div>
        </div>
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

TableExpense.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(TableExpense);
