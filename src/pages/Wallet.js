import React from 'react';
import ExpensesForms from '../components/ExpensesForms';
import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ExpensesForms />
        <Table />
      </div>
    );
  }
}

export default Wallet;
