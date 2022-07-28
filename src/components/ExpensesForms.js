import React from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { fetchExpensesThunk } from '../actions';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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
          <Row className="align-items-center">
          <Col md>
          <label htmlFor="value-input">
            Valor da despesa:
            <Form.Control size="sm"
              placeholder="Value"
              type="number"
              min={ 0 }
              data-testid="value-input"
              onChange={ this.handleChange }
              value={ value }
              name="value"
            />
          </label>
          </Col>
          <Col md>
          <Form.Label htmlFor="description-input">
            Descrição:
            <Form.Control rows={1}
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
              name="description"
            />
            </Form.Label>
            </Col>
            <Col md>
            <Form.Label htmlFor="moeda">
              Moeda:
              <Form.Select defaultValue="Choose..."
                name="currency"
                id="moeda"
                onChange={ this.handleChange }
                value={ currency }
              >
                { currencies?.map((c, i) => <option value={ c } key={ i }>{c}</option>)}
              </Form.Select>
            </Form.Label>
            </Col>
            <Col md>
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
          </Col>
          <Col md>
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
          </Col>
          <Col md>
          {' '}
          <Button variant="success"
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </Button>
          </Col>
          </Row>
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
