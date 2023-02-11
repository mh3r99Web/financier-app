import React, { useState, useEffect } from 'react';
import { useLazyGetLatestExchangeQuery } from '../../services/exchangeApi';
import Tbody from './Tbody';
import Thead from './Thead';

const columns = [
  { label: 'Symbols', accessor: 'symbols' },
  { label: 'Rates', accessor: 'rates' },
];

export const Table = () => {
  const [baseSymbol, setBaseSymbol] = useState('AMD');
  const [tableData, setTableData] = useState<{
    [k: string]: number;
  }>({});

  const [changeSymbol, { data, isLoading }] = useLazyGetLatestExchangeQuery();

  useEffect(() => {
    if (data) {
      setTableData(data.rates);
    }
  }, [data]);

  useEffect(() => {
    changeSymbol(baseSymbol);
  }, [baseSymbol]);

  const onSymbolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBaseSymbol(e.target.value);
  };

  const handleSorting = (sortField: string, sortOrder: string) => {
    const sortedArray = Object.entries(tableData).sort((a, b) => {
      if (sortField === 'symbols') {
        return sortOrder === 'asc' ? a[0].localeCompare(b[0]) : b[0].localeCompare(a[0]);
      } else if (sortField === 'rates') {
        return sortOrder === 'asc' ? a[1] - b[1] : b[1] - a[1];
      }
      return 0;
    });

    const sortedObj = Object.fromEntries(sortedArray);
    setTableData(sortedObj);
  };

  return (
    <>
      {!isLoading ? (
        <>
          <div>
            <select onChange={onSymbolChange} value={baseSymbol}>
              {Object.keys(data?.rates || {}).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <table>
            <Thead columns={columns} handleSorting={handleSorting} />
            <Tbody tableData={tableData} onChangeSymbol={(symbol) => setBaseSymbol(symbol)} />
          </table>
        </>
      ) : null}
    </>
  );
};
