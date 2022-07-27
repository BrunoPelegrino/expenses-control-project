import React from 'react';
import ExpensesForms from '../components/ExpensesForms';
import Header from '../components/Header';
import TableExpense from '../components/TableExpense';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ExpensesForms />
        <TableExpense />
      </div>
    );
  }
}

export default Wallet;
