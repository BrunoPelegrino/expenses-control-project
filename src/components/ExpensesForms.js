import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchExpensesThunk } from '../actions';
// import { saveExpensesAction } from '../actions';
const alimentacao = 'Alimentação';

const DEFAULT_STATE = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: alimentacao,
  exchangeRates: {},
};
class ExpensesForms extends React.Component {
  state = {
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: alimentacao,
    exchangeRates: {},
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { saveExpenses } = this.props;
    saveExpenses(this.state);
    this.setState(DEFAULT_STATE);
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value-input">
            Valor da despesa:
            <input
              type="number"
              min={ 0 }
              data-testid="value-input"
              onChange={ this.handleChange }
              value={ value }
              name="value"
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <textarea
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
              name="description"
            />
            <label htmlFor="moeda">
              Moeda:
              <select
                name="currency"
                id="moeda"
                onChange={ this.handleChange }
                value={ currency }
              >
                { currencies?.map((c, i) => <option value={ c } key={ i }>{c}</option>)}
              </select>
            </label>
          </label>
          <label htmlFor="method-input">
            Método de pagamento:
            <select
              data-testid="method-input"
              name="method"
              id="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Tipo:
            <select
              data-testid="tag-input"
              value={ tag }
              name="tag"
              id="tag-input"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (state) => dispatch(fetchExpensesThunk(state)),
});

ExpensesForms.propTypes = {
  currencies: propTypes.arrayOf(propTypes.array),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForms);
