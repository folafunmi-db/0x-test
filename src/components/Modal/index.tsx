import { Fragment, useEffect, useState } from "react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Transition, Dialog } from "@headlessui/react";
import useGetTokens from "@hooks/queries/useGetTokens";
import Image from "next/image";
import { v4 as uuid } from "uuid";
import { List } from "react-virtualized";
import { SwapType } from "pages";

type Props = {
  type: string;
  closeModal: () => void;
  reset?: () => void;
  isOpen: boolean;
  swap: SwapType;
  setSwap: React.Dispatch<React.SetStateAction<SwapType>>;
};

const Modal: React.FC<Props> = ({
  swap,
  setSwap,
  isOpen,
  type,
  closeModal,
  reset,
}) => {
  const [search, setSearch] = useState("");

  const getTokens = useGetTokens();

  const results =
    getTokens.data?.tokens?.filter(
      (i) =>
        i.name.toLowerCase().includes(search) ||
        i.address.toLowerCase().includes(search)
    ) ?? [];

  const listHeight = 300;
  const rowHeight = 60;
  const rowWidth = 400;

  useEffect(() => {
    if (reset) {
      reset();
    }
  }, []);

  function renderRow({ index, style }: any) {
    return results[index]?.name ? (
      <div
        key={uuid()}
        style={style}
        className="w-full flex p-2.5 justify-start items-center rounded hover:bg-gray-100 cursor-pointer transition"
        onClick={() => {
          if (type === "from") {
            setSwap({ ...swap, from: results[index] });
          } else {
            setSwap({ ...swap, to: results[index] });
          }
          closeModal();
          setSearch("");
        }}
      >
        {results[index]?.logoURI && (
          <Image src={results[index]?.logoURI ?? "#"} width={30} height={30} />
        )}
        <div className=" flex-col justify-center items-start ml-2">
          <p className="font-mont font-semibold text-gray-500 text-sm">
            {results[index]?.symbol ?? "Unavailable"}
          </p>
          <p className="font-mont font-normal text-gray-500 text-sm">
            {results[index]?.name ?? "Unavailable"}
          </p>
        </div>
      </div>
    ) : (
      <></>
    );
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-20"
        onClose={() => {
          closeModal();
          setSearch("");
        }}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md  my-8 overflow-hidden text-left align-middle transition-all transform bg-th-background shadow-xl rounded-2xl ">
              <Dialog.Title
                as="div"
                className="text-lg font-medium leading-6 pt-6 px-6 text-gray-900 flex items-center justify-between"
              >
                <h4 className="font-playfair text-xl text-th-accent-1 font-semibold inline-block">
                  Select a token
                </h4>
                <button onClick={closeModal}>
                  <XMarkIcon className="text-th-accent-6 w-6 h-6 cursor-pointer" />
                </button>
              </Dialog.Title>
              <div className="mt-2 mx-6 ">
                <div className="rounded-md border border-th-accent-4 bg-th-background p-2 w-full flex my-4 justify-between items-center text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <MagnifyingGlassIcon className="text-th-accent-6 w-6 h-6" />
                  <input
                    className="text-th-accent-6 w-full h-9 ml-2 font-mont bg-transparent focus:outline-none "
                    placeholder="Search name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="overflow-y-scroll h-80">
                  {getTokens.isLoading ? (
                    <>Loading...</>
                  ) : getTokens.isError ? (
                    <>Error</>
                  ) : (
                    <List
                      width={rowWidth}
                      height={listHeight}
                      rowHeight={rowHeight}
                      rowRenderer={renderRow}
                      rowCount={results.length}
                      overscanRowCount={3}
                    />
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
