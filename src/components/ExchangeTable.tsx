import React, { useState, useEffect } from "react";
import { useLazyGetLatestExchangeQuery } from "../services/exchangeApi";

const data = {
  rates: {
    AED: 0.009293,
    AFN: 0.227037,
    ALL: 0.274547,
    AMD: 1,
    ANG: 0.004561,
    AOA: 1.275979,
    ARS: 0.482119,
    AUD: 0.003644,
    AWG: 0.004561,
    AZN: 0.004306,
    BAM: 0.004626,
    BBD: 0.005109,
    BDT: 0.264904,
    BGN: 0.004623,
    BHD: 0.000954,
    BSD: 0.002531,
    BTN: 0.208808,
    BWP: 0.03308,
    BYN: 0.006387,
    BYR: 49.590116,
    BZD: 0.005101,
    CAD: 0.003379,
    CDF: 5.1766,
    CHF: 0.002335,
    CLP: 2.019457,
    CNY: 0.017224,
    COP: 12.044275,
    CRC: 1.468054,
    CUC: 0.00253,
    CUP: 0.067048,
    CVE: 0.260781,
    CZK: 0.05602,
    DJF: 0.450446,
    DKK: 0.017604,
    DOP: 0.142393,
    DZD: 0.345503,
    EGP: 0.077173,
    ERN: 0.037952,
    ETB: 0.135929,
    EUR: 0.002364,
    FJD: 0.005518,
    FKP: 0.002082,
    GBP: 0.002089,
    GEL: 0.006755,
    GGP: 0.002082,
    GHS: 0.030869,
    GIP: 0.002082,
    GMD: 0.154581,
    GNF: 21.777761,
    GTQ: 0.01984,
    GYD: 0.533966,
    HKD: 0.019861,
    HNL: 0.062383,
    HRK: 0.017818,
    HTG: 0.383377,
    HUF: 0.916623,
    IDR: 38.426015,
    ILS: 0.008937,
    IMP: 0.002082,
    INR: 0.208649,
    IQD: 3.693595,
    IRR: 106.960315,
    ISK: 0.359519,
    JEP: 0.002082,
    JMD: 0.390497,
    JOD: 0.001795,
    JPY: 0.331905,
    KES: 0.316759,
    KGS: 0.219526,
    KHR: 10.373252,
    KMF: 1.160433,
    KPW: 2.27714,
    KRW: 3.204534,
    KWD: 0.000774,
    KYD: 0.002109,
    KZT: 1.140895,
    LAK: 42.631978,
    LBP: 37.990709,
    LKR: 0.923675,
    LRD: 0.397731,
    LSL: 0.04491,
    LTL: 0.007471,
    LVL: 0.00153,
    LYD: 0.012117,
    MAD: 0.025948,
    MDL: 0.047524,
    MGA: 10.894296,
    MKD: 0.145722,
    MMK: 5.314295,
    MNT: 8.878247,
    MOP: 0.020461,
    MRO: 0.903248,
    MUR: 0.115007,
    MVR: 0.038862,
    MWK: 2.597442,
    MXN: 0.047213,
    MYR: 0.010962,
    MZN: 0.159672,
    NAD: 0.044909,
    NGN: 1.165038,
    NIO: 0.092468,
    NOK: 0.025592,
    NPR: 0.334098,
    NZD: 0.003995,
    OMR: 0.000974,
    PAB: 0.00253,
    PEN: 0.009765,
    PGK: 0.008919,
    PHP: 0.137957,
    PKR: 0.681685,
    PLN: 0.011271,
    PYG: 18.417106,
    QAR: 0.009213,
    RON: 0.01159,
    RSD: 0.277338,
    RUB: 0.185785,
    RWF: 2.744743,
    SAR: 0.009494,
    SBD: 0.020827,
    SCR: 0.033226,
    SDG: 1.480112,
    SEK: 0.02634,
    SGD: 0.00336,
    SHP: 0.003485,
    SLE: 0.049867,
    SLL: 49.855777,
    SOS: 1.438355,
    SRD: 0.081841,
    STD: 52.368127,
    SVC: 0.022142,
    SYP: 6.356852,
    SZL: 0.045276,
    THB: 0.085228,
    TJS: 0.026277,
    TMT: 0.008881,
    TND: 0.00785,
    TOP: 0.005904,
    TRY: 0.047649,
    TTD: 0.017188,
    TWD: 0.076262,
    TZS: 5.915393,
    UAH: 0.092986,
    UGX: 9.273885,
    USD: 0.00253,
    UYU: 0.098958,
    UZS: 28.688763,
    VEF: 6016.505677,
    VES: 0.061148,
    VND: 59.647295,
    VUV: 0.296026,
    WST: 0.006805,
    XAF: 1.55164,
    XDR: 0.001884,
    XOF: 1.551365,
    XPF: 0.281791,
    YER: 0.633349,
    ZAR: 0.045256,
    ZMK: 22.773994,
    ZMW: 0.048723,
    ZWL: 0.814694,
  },
};

const ExchangeTable = () => {

    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");


  const [baseSymbol, setBaseSymbol] = useState("AMD");
  //   const [changeSymbol, { data, isLoading }] = useLazyGetLatestExchangeQuery();

  //   useEffect(() => {
  //     changeSymbol(baseSymbol);
  //   }, [baseSymbol]);

  const onSymbolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBaseSymbol(e.target.value);
  };


  const columns = [
    { label: "Symbols", accessor: "symbols" },
    { label: "Rates", accessor: "Rates" },
   ];


   const handleSortingChange=(accessor:string)=>{
    const sortOrder =
    accessor === sortField && order === "asc" ? "desc" : "asc";
   setSortField(accessor);
   setOrder(sortOrder);
//    handleSorting(accessor, sortOrder);
   }

  return (
    <>
      {!false ? (
        <div>
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
            <thead>
              <tr>
                {
                   columns.map(col=>(
                    <td key={col.accessor} onClick={() => handleSortingChange(col.accessor)}>{col.label}</td>
                   ))
                }
              </tr>
            </thead>
            <tbody>
              {Object.entries(data?.rates || {}).map((value) => (
                <tr
                  key={value[0]}
                  onClick={() => {
                    setBaseSymbol(value[0]);
                  }}
                >
                  <td>{value[0]}</td>
                  <td>{value[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};

export default ExchangeTable;
