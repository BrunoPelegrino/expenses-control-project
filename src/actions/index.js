import fetchCurrencies from '../services/Api';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const addEmail = (email) => ({ type: SAVE_EMAIL, email });

export const saveExpensesAction = (payload) => ({ type: SAVE_EXPENSES,
  payload,
});

export const currencieCoin = (currencies) => ({
  type: FETCH_CURRENCIES,
  currencies,
});

export const removeExpenseAction = (id) => ({
  type: REMOVE_EXPENSE,
  payload: id,
});

export const fetchCurrenciesThunk = () => async (dispatch) => {
  const response = await fetchCurrencies();
  // console.log(response);
  const currencies = Object.keys(response).filter((remove) => remove !== 'USDT');
  // console.log(currencies);
  dispatch(currencieCoin(currencies));
};

export const fetchExpensesThunk = (state) => async (dispatch) => {
  const response = await fetchCurrencies();
  // console.log(response);
  dispatch(saveExpensesAction({ ...state,
    exchangeRates: response,
  }));
};
