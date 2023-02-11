import React from 'react';

type TbodyProps = {
  tableData: { [key: string]: number };
  onChangeSymbol: (symbol: string) => void;
};

const Tbody: React.FC<TbodyProps> = ({ tableData, onChangeSymbol }) => {
  return (
    <tbody>
      {Object.entries(tableData).map((data) => (
        <tr key={data[0]} onClick={() => onChangeSymbol(data[0])}>
          <th>{data[0]}</th>
          <th>{data[1]}</th>
        </tr>
      ))}
    </tbody>
  );
};

export default Tbody;
