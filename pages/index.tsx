import Head from "next/head";
import { ChevronDownIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Image from "next/image";
import ThemeChanger from "src/components/ThemeChanger";
import Modal from "@components/Modal";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("from");
  const [swap, setSwap] = useState({ from: "", to: "" });

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
        <main className="flex justify-center items-center gap-4 min-h-[85vh] relative flex-col py-5 px-3">
          <div className="rounded-xl border border-th-accent-4 bg-th-background p-4  w-full max-w-lg flex flex-col my-4">
            <div className="rounded-md relative border border-th-accent-4 bg-th-background px-3 py-4 my-4 flex justify-between items-center w-full">
              <label className="absolute p-1 text-[0.65rem] -top-3 bg-th-background font-mont">
                From
              </label>
              <button
                type="button"
                onClick={() => openModal("from")}
                className="flex text-sm justify-start items-center font-mont gap-2 font-semibold bg-th-orange-2 py-2 px-4 rounded-full text-white cursor-pointer bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Select a token
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              {/*
              <p className="font-semibold font-mont">0.00</p>
							*/}
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
                Select a token
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              <Modal
                swap={swap}
                setSwap={setSwap}
                isOpen={isOpen}
                type={type}
                closeModal={closeModal}
              />
              {/*
              <p className="font-semibold font-mont">0.00</p>
							*/}
            </div>

            <button className="w-full font-semibold flex justify-center items-center text-th-orange-2 bg-th-orange-5 py-4 font-mont text-sm rounded-full my-4">
              Check Orders
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
