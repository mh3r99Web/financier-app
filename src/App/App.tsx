import React from 'react';
import Converter from '../components/Converter';
import { Table as ExchangeTable } from '../components/ExchangeTable/Table';
import './App.scss';

const App = () => {
  return (
    <div>
      {/* <Converter/> */}
      <ExchangeTable />
    </div>
  );
};

export default App;
