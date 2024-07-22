import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVertical, FilePenLine, Trash2 } from "lucide-react";

interface Props {
  openModalDelete: () => void;
  openModalEdit: () => void;
}

function UrlSetting({ openModalDelete, openModalEdit }: Props) {
  return (
    <Menu>
      <MenuButton className="">
        <EllipsisVertical className="size-5 text-slate-500" />
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className={
          "mt-2 border border-slate-100 w-[160px] rounded-md bg-white p-2"
        }
      >
        <MenuItem>
          <button
            className="w-full flex   items-center gap-1 py-1 text-sm rounded-md hover:bg-slate-50"
            onClick={openModalEdit}
          >
            <FilePenLine className="size-4" />
            Edit
          </button>
        </MenuItem>
        <MenuItem>
          <button
            className="w-full flex   items-center gap-1 py-1 text-sm rounded-md hover:bg-slate-50"
            onClick={openModalDelete}
          >
            <Trash2 className="size-4 text-red-500" />
            Delete
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
export default UrlSetting;
