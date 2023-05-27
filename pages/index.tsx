import Head from "next/head";
import { ChevronDownIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ThemeChanger from "src/components/ThemeChanger";
import Modal from "@components/Modal";
import useGetOrders from "@hooks/queries/useGetOrders";
import { Token } from "@hooks/queries/useGetTokens";
import { useGetOrdersSubscription } from "@hooks/queries/useGetOrderSubscription";
import { v4 as uuid } from "uuid";
import DepthIndicator from "@components/DepthIndicator";

export type SwapType = {
  from: Token | null;
  to: Token | null;
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("from");
  const [swap, setSwap] = useState<SwapType>({ from: null, to: null });

  const getOrders = useGetOrders({
    baseToken: swap.from?.address ?? "",
    quoteToken: swap.to?.address ?? "",
  });

  useGetOrdersSubscription({
    baseToken: swap.from?.address ?? "",
    quoteToken: swap.to?.address ?? "",
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(type: "from" | "to") {
    setIsOpen(true);
    setType(type);
  }

  return (
    <>
      <Head>
        <title>0x Order</title>
      </Head>

      <div className="min-h-screen relative bg-th-background">
        <div className="flex justify-end items-center p-4">
          <ThemeChanger />
        </div>
        <main className="flex flex-col justify-start items-center gap-4 min-h-[85vh] relative flex-col py-5 px-5">
          <div className="shadow-md hover:shadow-xl transition rounded-xl border border-th-accent-4 bg-th-background p-4 w-full max-w-lg flex flex-col my-4">
            <div className="rounded-md relative border border-th-accent-4 bg-th-background px-3 py-4 my-4 flex justify-between items-center w-full">
              <label className="absolute p-1 text-[0.65rem] -top-3 bg-th-background font-mont">
                From
              </label>
              <button
                type="button"
                onClick={() => openModal("from")}
                className="flex text-sm justify-start items-center font-mont gap-2 font-semibold bg-th-orange-2 py-2 px-4 rounded text-white cursor-pointer bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {swap.from?.name ?? "Select a token"}
                <ChevronDownIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="p-1.5 bg-th-orange-5  self-center flex justify-center items-center rounded-full">
              <ArrowDownIcon className="text-th-orange-2 w-6 h-6" />
            </div>

            <div className="rounded-md relative border border-th-accent-4 bg-th-background px-3 py-4 my-4 flex justify-between items-center w-full">
              <label className="absolute p-1 text-[0.65rem] -top-3 bg-th-background font-mont">
                To
              </label>
              <button
                type="button"
                onClick={() => openModal("to")}
                className="flex text-sm justify-start items-center font-mont gap-2 font-semibold bg-th-orange-2 py-2 px-4 rounded text-white cursor-pointer bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {swap.to?.name ?? "Select a token"}
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              <Modal
                swap={swap}
                setSwap={setSwap}
                isOpen={isOpen}
                type={type}
                closeModal={closeModal}
              />
            </div>
          </div>
          <div className="flex flex-col w-full justify-start items-start md:overflow-x-auto scrollbar-thin scrollbar scrollbar-thumb-gray-700 hover:scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full bg-th-background md:gap-2">
            <div className="flex flex-col text-xs font-mont justify-start items-start w-full">
              <div className="flex flex-col md:flex-row w-full justify-start items-start">
                <div className="w-full md:w-[50%] border-th-accent-4 border ">
                  <div className="font-semibold relative flex px-3 gap-4 border-th-accent-4 border-b justify-start py-2 items-start w-full">
                    <p className="text-th-accent-1 font-medium min-w-[15px] block w-1/3 truncate">
                      Price(USD)
                    </p>
                    <p className="text-th-accent-1 text-right min-w-[15px] w-1/3 block md:text-right justify-start md:justify-end items-center truncate">
                      Quantity(USD)
                    </p>
                    <p className="text-th-accent-1 text-right min-w-[15px] w-1/3 block text-right justify-end items-center truncate ">
                      Total(USD)
                    </p>
                  </div>
                  {getOrders.isLoading && swap.from && swap.to ? (
                    <p className="w-full flex justify-center items-center px-3 py-2">
                      Loading...
                    </p>
                  ) : getOrders.isError ? (
                    <p className="w-full flex justify-center items-center px-3 py-2">
                      Error getting orders
                    </p>
                  ) : (
                    getOrders.data?.bids?.records
                      ?.slice(0, 20)
                      ?.map((item, i) => (
                        <div
                          className="flex px-3 gap-4 justify-start py-2 items-start w-full relative"
                          key={uuid()}
                        >
                          <DepthIndicator
                            color="green"
                            width={
                              (i /
                                getOrders.data?.bids?.records?.slice(0, 20)
                                  .length) *
                              100
                            }
                            direction="r"
                          />
                          <p className="font-medium text-green-500 text-th-accent-1 min-w-[15px] block w-1/3 z-[3]">
                            {Number(
                              item?.order?.makerAmount ?? 0
                            ).toLocaleString()}
                          </p>
                          <p className="text-th-accent-1 text-right min-w-[15px] z-[3] w-1/3 block justify-start md:justify-end items-center truncate">
                            {Number(
                              item?.order?.takerTokenFeeAmount ?? 0
                            ).toLocaleString()}
                          </p>
                          <p className="text-th-accent-1 text-right min-w-[15px] w-1/3 z-[3] block justify-end items-center truncate">
                            {Number(
                              item?.order?.takerAmount ?? 0
                            ).toLocaleString()}
                          </p>
                        </div>
                      ))
                  )}
                </div>
                <div className="w-full md:w-[50%] border-th-accent-4 border ">
                  <div className="font-semibold flex px-3 gap-4 justify-start py-2 items-start w-full border-th-accent-4 border-b ">
                    <p className="text-th-accent-1 min-w-[15px] w-1/3 block justify-start items-center truncate">
                      Total(USD)
                    </p>
                    <p className="text-th-accent-1 min-w-[15px] w-1/3 block justify-start items-center truncate">
                      Quantity(USD)
                    </p>
                    <p className="font-medium text-th-accent-1 min-w-[15px] w-1/3 text-right block justify-end items-center truncate">
                      Price(USD)
                    </p>
                  </div>
                  {getOrders.isLoading && swap.from && swap.to ? (
                    <p className="w-full flex justify-center items-center px-3 py-2">
                      Loading...
                    </p>
                  ) : getOrders.isError ? (
                    <p className="w-full flex justify-center items-center px-3 py-2">
                      Error getting orders
                    </p>
                  ) : (
                    getOrders.data?.asks?.records
                      ?.slice(0, 20)
                      ?.map((item, i) => (
                        <div
                          className={`relative flex px-3 gap-4 justify-start py-2 items-start w-full ${
                            i % 2 ? "brightness-70" : ""
                          }`}
                          key={uuid()}
                        >
                          <DepthIndicator
                            color="red"
                            width={
                              (i /
                                getOrders.data?.asks?.records?.slice(0, 20)
                                  .length) *
                              100
                            }
                            direction="l"
                          />
                          <p className="text-th-accent-1 min-w-[15px] w-1/3 block justify-start items-center truncate">
                            {Number(
                              item?.order?.makerAmount ?? 0
                            ).toLocaleString()}
                          </p>
                          <p className="text-th-accent-1 min-w-[15px] w-1/3 text-left block justify-start items-center truncate">
                            {Number(
                              item?.order?.takerTokenFeeAmount ?? 0
                            ).toLocaleString()}
                          </p>
                          <p className="font-medium text-red-500 text-th-accent-1 min-w-[15px] w-1/3 text-right block justify-end items-center truncate">
                            {Number(
                              item?.order?.takerAmount ?? 0
                            ).toLocaleString()}
                          </p>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
