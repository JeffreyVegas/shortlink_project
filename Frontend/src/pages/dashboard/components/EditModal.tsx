import { UrlSchema } from "@/utilities/zod/url.validations";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Url as UrlType } from "@/@types";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import { generateRandomName } from "@/utilities/randomName";
import { useEffect } from "react";
import { updateUrl } from "@/redux/state/url/url.slice";

interface Props {
  isOpenEditModal: boolean;
  close: () => void;
  url: UrlType;
}

function EditModal({ isOpenEditModal, close, url }: Props) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UrlType>({ resolver: zodResolver(UrlSchema) });

  const { isLoading, isError, message } = useAppSelector((state) => state.url);

  useEffect(() => {
    const key = url.shortUrl?.substring(url.shortUrl.indexOf("l/") + 2);
    setValue("shortUrl", key);
    url.description && setValue("description", url.description);
    setValue("url", url.url);
  }, [url]);

  const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

  const onSubmit = async (data: UrlType) => {
    const urlData = {
      ...url,
      url: data.url,
      shortUrl: import.meta.env.VITE_DOMAIN_WEBSITE + "l/" + data.shortUrl,
      description: data.description,
    };
    const res = await dispatch(updateUrl(urlData));
    if (res.meta.requestStatus === "fulfilled") {
      close();
      reset();
    }
  };

  return (
    <>
      <Transition appear show={isOpenEditModal}>
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
                <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl border">
                  <DialogTitle
                    as="h3"
                    className="text-base/7 font-medium text-black"
                  >
                    EDIT URL
                  </DialogTitle>
                  <div className="mt-5">
                    <form
                      className="max-w-sm mx-auto"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="mb-5">
                        <label
                          htmlFor="url"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Your URL
                        </label>
                        <input
                          type="text"
                          {...register("url")}
                          className={cn(
                            "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-35"
                          )}
                          disabled={isLoading}
                          placeholder="https://url.com/"
                        />
                      </div>
                      <div className="mb-5">
                        <label
                          htmlFor="shortUrl"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Short url
                        </label>
                        <div className="  mb-2 text-sm  text-gray-900 ">
                          <span>Enter a custom name or </span>
                          <button
                            type="button"
                            className="text-blue-500 border border-blue-500 rounded-md px-1 text-sm "
                            onClick={() => {
                              setValue("shortUrl", generateRandomName(6));
                            }}
                          >
                            generate randon name
                          </button>
                        </div>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md ">
                            {import.meta.env.VITE_DOMAIN_WEBSITE + "l/"}
                          </span>
                          <input
                            type="text"
                            {...register("shortUrl")}
                            className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  disabled:opacity-35"
                            placeholder="custom name ..."
                            disabled={isLoading}
                          />
                        </div>
                        {errors.shortUrl && (
                          <span className="text-red-500">
                            {errors.shortUrl.message}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <div className="border-b border-gray-300 flex-1"></div>
                        <span>optional</span>
                        <div className="border-b border-gray-300 flex-1"></div>
                      </div>
                      <div>
                        <label
                          htmlFor=""
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Description
                        </label>
                        <textarea
                          {...register("description")}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-35 mb-4"
                          placeholder="description ..."
                          required={false}
                          disabled={isLoading}
                        />
                      </div>
                      {isError && (
                        <div className="mb-4">
                          <p className="text-sm bg-red-100 rounded-md p-2  text-red-500 ">
                            {message}
                          </p>
                        </div>
                      )}

                      <div>
                        <button
                          type="submit"
                          className="w-full gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white disabled:opacity-35"
                          disabled={isLoading}
                        >
                          create url
                        </button>
                      </div>
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
    </>
  );
}
export default EditModal;
