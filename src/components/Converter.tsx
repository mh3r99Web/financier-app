import axios from "axios";
import React, { useState, useEffect } from "react";
import { useGetExchangeSymbolsQuery, useLazyConvertFromToQuery } from "../services/exchangeApi";
import CurrencyRow from "./CurrencyRow";

const Converter = () => {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([])
  const [fromCurrency, setFromCurrency] = useState("")
  const [toCurrency, setToCurrency] = useState("")
  const [amount, setAmount] = useState<number | string >(1)
  const [result, setResult]=useState(1)


  const { data:symbolsData, isLoading:isLoadingSymbols } = useGetExchangeSymbolsQuery();

  const [convertFromTo, { data:convertData, isLoading:isLoadingConvert} ] =useLazyConvertFromToQuery();

 

  useEffect(() => {
    if(symbolsData){
      const symbols=Object.keys(symbolsData.symbols);
      setCurrencyOptions(symbols)
      setFromCurrency(symbols[0])
      setToCurrency(symbols[1])
    }
  }, [symbolsData])





  useEffect(() => {
    if(fromCurrency && toCurrency && amount){
      convertFromTo({
        amount:amount,
        from:fromCurrency,
        to: toCurrency, 
      })
    }
  
  }, [fromCurrency, toCurrency, amount])
  


  function handleAmountChange(e:React.ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value)
  }



  return (
    <>
      {!isLoadingSymbols && !isLoadingConvert ? (
        <div>
          <div>
            <h1>Converter</h1>
          </div>
          <CurrencyRow currencyOptions={currencyOptions}  selectedCurrency={fromCurrency}
           onChangeCurrency={e => setFromCurrency(e.target.value)}
           amount={amount}
           onChangeAmount={handleAmountChange}
          />
          <CurrencyRow currencyOptions={currencyOptions}  selectedCurrency={toCurrency}
          onChangeCurrency={e => setToCurrency(e.target.value)}
          amount={convertData?.result || 0}
          />
        </div>
      ) : null}
    </>
  );
};

export default Converter;
