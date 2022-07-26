import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrenciesThunk } from '../actions';

// consulta para fazer reducer: https://www.digitalocean.com/community/tutorials/js-finally-understand-reduce
// e https://www.alura.com.br/artigos/formatando-numeros-no-javascript

class Header extends React.Component {
  componentDidMount = async () => {
    const { dispatch } = this.props;
    await dispatch(fetchCurrenciesThunk());
  }

  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <p>Email:</p>
        <h3 data-testid="email-field">
          { email }
        </h3>
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
      </header>
    );
  }
}

Header.propTypes = {
  dispatchEmail: PropTypes.object,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
