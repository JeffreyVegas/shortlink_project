import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ArrowUpDown, ArrowDownWideNarrow } from "lucide-react";
interface Props {
  sortbyDate: () => void;
}

function Sortby({ sortbyDate }: Props) {
  return (
    <Menu>
      <MenuButton className="w-[160px] border border-slate-100 rounded-md px-2  py-2 text-sm flex  gap-2 shadow-md  items-center font-bold hover:bg-slate-50">
        <ArrowUpDown className=" size-4 mr-1" />
        Sort by
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className={
          "mt-2 border border-slate-100 w-[160px] rounded-md bg-white p-2"
        }
      >
        <MenuItem>
          <button
            className="w-full flex   items-center gap-1 py-1 text-sm rounded-md hover:bg-slate-50"
            onClick={sortbyDate}
          >
            <ArrowDownWideNarrow className=" size-4 mr-1" /> Date added
          </button>
        </MenuItem>
        <MenuItem>
          <button className="w-full flex   items-center gap-1 py-1 text-sm rounded-md hover:bg-slate-50">
            <ArrowDownWideNarrow className=" size-4 mr-1" /> Number of clicks
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

export default Sortby;
