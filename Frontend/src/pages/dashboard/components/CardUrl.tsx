import { Url } from "@/@types";
import { Copy as CopyIcon } from "lucide-react";
import { BarChart } from "lucide-react";

import UrlSetting from "./UrlSetting";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
interface Props {
  url: Url;
}

function CardUrl({ url }: Props) {
  const [isOpenDelteModal, setIsOpenDelteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const openModalDelete = () => {
    setIsOpenDelteModal(true);
  };

  const closeModalDelete = () => {
    setIsOpenDelteModal(false);
  };

  const openModalEdit = () => {
    setIsOpenEditModal(true);
  };
  const closeModalEdit = () => {
    setIsOpenEditModal(false);
  };

  return (
    <>
      <DeleteModal
        isOpenDelteModal={isOpenDelteModal}
        close={closeModalDelete}
        url={url}
      />
      <EditModal
        isOpenEditModal={isOpenEditModal}
        close={closeModalEdit}
        url={url}
      />
      <div className=" border border-slate-100 rounded-md flex items-center justify-between py-4 px-3 shadow-md">
        <div className="flex flex-col  pr-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">{url.shortUrl}</span>
            <button
              className="text-gray-500 bg-slate-300 rounded-md p-0.5 hover:bg-slate-200"
              onClick={() => {
                if (url.shortUrl !== undefined) {
                  navigator.clipboard.writeText(url.shortUrl);
                }
              }}
            >
              <CopyIcon className="size-4" />
            </button>
          </div>
          <p className="text-sm line-clamp-1">{url.url}</p>
        </div>
        <div className="flex gap-2  ">
          <div className="flex items-center gap-1 text-sm bg-slate-200 rounded-lg py-0.5 px-2">
            <BarChart className="size-4" />
            <span className="min-w-[50px] ">{url.numberClicks} clicks</span>
          </div>
          <UrlSetting
            openModalDelete={openModalDelete}
            openModalEdit={openModalEdit}
          />
        </div>
      </div>
    </>
  );
}
export default CardUrl;
