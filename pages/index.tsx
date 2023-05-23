import Head from "next/head";
import { ChevronDownIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ThemeChanger from "src/components/ThemeChanger";
import Modal from "@components/Modal";
import useGetOrders from "@hooks/queries/useGetOrders";
import { Token } from "@hooks/queries/useGetTokens";
import { useGetOrdersSubscription } from "@hooks/queries/useGetOrderSubscription";

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

      <div className="min-h-screen relative">
        <div className="flex justify-end items-center p-4">
          <ThemeChanger />
        </div>
        <main className="flex flex-col justify-start items-center gap-4 min-h-[85vh] relative flex-col py-5 px-5">
          <div className="rounded-xl border border-th-accent-4 bg-th-background p-4 w-full max-w-lg flex flex-col my-4">
            <div className="rounded-md relative border border-th-accent-4 bg-th-background px-3 py-4 my-4 flex justify-between items-center w-full">
              <label className="absolute p-1 text-[0.65rem] -top-3 bg-th-background font-mont">
                From
              </label>
              <button
                type="button"
                onClick={() => openModal("from")}
                className="flex text-sm justify-start items-center font-mont gap-2 font-semibold bg-th-orange-2 py-2 px-4 rounded-full text-white cursor-pointer bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
                className="flex text-sm justify-start items-center font-mont gap-2 font-semibold bg-th-orange-2 py-2 px-4 rounded-full text-white cursor-pointer bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
          <div className="flex flex-col w-full justify-start border-th-accent-4 border items-start overflow-x-auto scrollbar-thin  scrollbar scrollbar-thumb-gray-700 hover:scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full bg-th-background gap-2 w-full overflow-scroll">
            <div className="flex flex-col text-xs font-mont justify-start items-start w-full">
              <div className="flex w-full justify-start items-start py-2">
                <div className="w-[48%] flex gap-2 justify-start items-start whitespace-nowrap min-w-[400px]">
                  <p className="pl-3 text-th-accent-1 min-w-[50px] w-[10%]">
                    Price(USD)
                  </p>
                  <p className="text-th-accent-1 min-w-[150px] w-[45%] flex justify-end items-center">
                    Quantity(USD)
                  </p>
                  <p className="pr-3 text-th-accent-1 min-w-[150px] w-[45%] flex justify-end items-center ">
                    Total(USD)
                  </p>
                </div>
                <div className="w-[48%] flex justify-start items-start whitespace-nowrap min-w-[400px]">
                  <p className="pl-3 text-th-accent-1 min-w-[150px] w-[45%] flex justify-start items-center">
                    Total(USD)
                  </p>
                  <p className="text-th-accent-1 min-w-[150px] w-[45%] flex justify-start items-center">
                    Quantity(USD)
                  </p>
                  <p className="pr-3 text-th-accent-1 min-w-[50px] w-[10%]">
                    Price(USD)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
