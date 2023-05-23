import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "@services/api";

export type OrdersResType = {
  bids: Asks;
  asks: Asks;
};

export type Asks = {
  total: number;
  page: number;
  perPage: number;
  records: Record[];
};

export type Record = {
  order: Order;
  metaData: MetaData;
};

export type MetaData = {
  orderHash: string;
  remainingFillableTakerAmount: string;
  createdAt: Date;
};

export type Order = {
  signature: Signature;
  sender: string;
  maker: string;
  taker: string;
  takerTokenFeeAmount: string;
  makerAmount: string;
  takerAmount: string;
  makerToken: string;
  takerToken: string;
  salt: string;
  verifyingContract: string;
  feeRecipient: string;
  expiry: string;
  chainId: number;
  pool: string;
};

export type Signature = {
  signatureType: number;
  r: string;
  s: string;
  v: number;
};

export const QUERY_KEY_ORDERS = "orders";

type Props = {
  quoteToken: string;
  baseToken: string;
  checkOrders?: boolean;
};

export const getOrders = async ({
  quoteToken,
  baseToken,
}: Props): Promise<OrdersResType> => {
  const response = await api.get(
    `/orderbook/v1?quoteToken=${quoteToken}&baseToken=${baseToken}`,
    {
      headers: {
        "0x-api-key": process.env.NEXT_PUBLIC_X_ENV,
      },
    }
  );

  return response.data;
};

const useGetOrders = ({ quoteToken, baseToken }: Props) => {
  return useQuery(
    [QUERY_KEY_ORDERS, baseToken, quoteToken],
    () => getOrders({ quoteToken, baseToken }),
    {
      refetchOnWindowFocus: false,
      enabled: !!baseToken && !!quoteToken,
      onSuccess: () => {},
      onError: (err: AxiosError) => {
        console.log(err.message);
      },
    }
  );
};

export default useGetOrders;
