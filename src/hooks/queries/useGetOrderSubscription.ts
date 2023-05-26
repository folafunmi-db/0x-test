import { QueryKey, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { OrdersResType } from "./useGetOrders";
import { v4 as uuid } from "uuid";

type SubscribeEvent = {
  type: "subscribe";
  channel: string;
  requestId: string;
};

type UpdateEvent = {
  type: "update";
  channel: string;
  requestId: string;
  payload: Partial<OrdersResType["asks"]["records"]>;
};

type WebSocketEvent = SubscribeEvent | UpdateEvent;

type Props = {
  quoteToken: string;
  baseToken: string;
  checkOrders?: boolean;
};

export const useGetOrdersSubscription = ({ quoteToken, baseToken }: Props) => {
  const queryClient = useQueryClient();

  const websocket = React.useRef<WebSocket>();

  React.useEffect(() => {
    websocket.current = new WebSocket(process.env.NEXT_PUBLIC_SOCKET!);

    websocket.current.onmessage = (event) => {
      const data: WebSocketEvent = JSON.parse(event.data);

      switch (data.type) {
        case "subscribe":
          queryClient.invalidateQueries([data.channel].filter(Boolean));
          break;
        case "update":
          queryClient.setQueryData<OrdersResType>(
            [data.channel, baseToken, quoteToken] as QueryKey,
            (oldData) => {
              // console.log({ data, oldData });
              return {
                asks: {
                  ...oldData?.asks,
                  records: [...data.payload, ...(oldData?.asks?.records ?? [])],
                },
                bids: {
                  ...oldData?.bids,
                  records: [...data.payload, ...(oldData?.bids?.records ?? [])],
                },
              } as OrdersResType;
            }
          );
          break;
      }
    };

    websocket.current.onopen = () => {
      if (baseToken && quoteToken) {
        websocket.current?.send(
          JSON.stringify({
            type: "subscribe",
            channel: "orders",
            requestId: uuid(),
          })
        );
      }
    };

    return () => {
      if (websocket.current?.readyState === 1) {
        websocket.current?.close();
      }
    };
  }, [queryClient, baseToken, quoteToken]);
};
