import { Url } from "@/@types";
import { useAppDispatch } from "@/hooks/redux.hook";
import { removeUrl } from "@/redux/state/url/url.slice";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState } from "react";

interface Props {
  isOpenDelteModal: boolean;
  close: () => void;
  url: Url;
}

function DeleteModal({ isOpenDelteModal, close, url }: Props) {
  const dispatch = useAppDispatch();

  const [diseableButton, setDiseableButton] = useState(true);

  const handelSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await dispatch(removeUrl(url._id as string));
    if (res.meta.requestStatus === "fulfilled") {
      close();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === url.shortUrl) {
      setDiseableButton(false);
    } else {
      setDiseableButton(true);
    }
  };

  return (
    <Transition appear show={isOpenDelteModal}>
      <Dialog
        as="div"
        className="relative z-10 focus:outline-none "
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl border ">
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-black"
                >
                  Delete <span className="font-bold">{url.shortUrl}</span>
                </DialogTitle>
                <div className="mt-5">
                  <p className="text-sm text-gray-500 mb-3">
                    Deleting this link will remove all. This action cannot be
                    undone – proceed with caution.
                  </p>
                  <form action="" onSubmit={handelSubmit}>
                    <div className=" mb-3">
                      <label htmlFor="" className="text-sm font-medium">
                        to confirm type{" "}
                        <span className="font-bold">{url.shortUrl}</span>
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-0 focus:ring-black focus:ring-opacity-50"
                      />
                    </div>
                    <button
                      disabled={diseableButton}
                      className="bg-red-500 w-full rounded-md py-2 px-3 text-sm font-semibold text-white shadow-inner shadow-red-500/10 focus:outline-none data-[hover]:bg-red-600 data-[open]:bg-red-700 data-[focus]:outline-1 data-[focus]:outline-red-500 disabled:opacity-35"
                    >
                      confirm delete
                    </button>
                  </form>
                </div>
                <div className="mt-4 absolute right-5 top-0">
                  <Button onClick={close}>x</Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default DeleteModal;
