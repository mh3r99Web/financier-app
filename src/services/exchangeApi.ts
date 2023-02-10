import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const exchangeApiHeaders = {
  apikey: "tt1HNAZW6dTYrMG45A7lWplRNeEqi3um",
};

const baseUrl = "https://api.apilayer.com/exchangerates_data/";

const createRequest = (url: string) => ({
  url,
  headers: exchangeApiHeaders,
});

interface ExchangeSymbolsResponse {
  success: boolean;
  symbols: { [key: string]: string };
}

interface ConvertFromToResponse {
  date: Date;
  info: {
    rate: number;
    timestamp: number;
  };
  query: {
    amount: number;
    from: string;
    to: string;
  };
  result: number;
  success: boolean;
}

interface LatestExchangeResponse {
  base: string;
  date: Date;
  rates: { [key: string]: number };
}

export const exchangeApi = createApi({
  reducerPath: "exchangeApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getExchangeSymbols: builder.query<ExchangeSymbolsResponse, void>({
      query: () => createRequest(`symbols`),
    }),
    convertFromTo: builder.query({
      query: (data) =>
        createRequest(
          `convert?to=${data.to}&from=${data.from}&amount=${data.amount}`
        ),
    }),
    getLatestExchange: builder.query<LatestExchangeResponse, string>({
      query: (baseSymbol) => createRequest(`latest?&base=${baseSymbol}`),
    }),
  }),
});

export const {
  useGetExchangeSymbolsQuery,
  useLazyConvertFromToQuery,
  useLazyGetLatestExchangeQuery
} = exchangeApi;
