import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type ResType = {
  name: string;
  logoURI: string;
  keywords: string[];
  timestamp: Date;
  tokens: Token[];
  version: Version;
};

export type Token = {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
};

export type Version = {
  major: number;
  minor: number;
  patch: number;
};

export const QUERY_KEY_TOKENS = "Get Tokens";

export const getTokens = async (): Promise<ResType> => {
  const response = await axios.get(
    `https://tokens.coingecko.com/uniswap/all.json`,
    {
      headers: {},
    }
  );

  return response.data;
};

const useGetTokens = () => {
  return useQuery([QUERY_KEY_TOKENS], () => getTokens(), {
    refetchOnWindowFocus: false,
    // staleTime: Infinity,
    onSuccess: () => {},
    onError: (err: AxiosError) => {
      console.log(err.message);
    },
  });
};

export default useGetTokens;
