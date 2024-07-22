import { useAppDispatch } from "@/hooks/redux.hook";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { logout } from "@/redux/state/user/user.slice";
import { Link, useNavigate } from "react-router-dom";

function Avatar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await dispatch(logout());
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };
  return (
    <Menu>
      <MenuButton className="flex justify-center items-start w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ">
        <svg
          className=" w-12 h-12 text-gray-400 "
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          ></path>
        </svg>
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className={
          "mt-2 border border-slate-100 w-[100px] rounded-md bg-white p-2"
        }
      >
        <MenuItem>
          <Link
            to={"/dashboard"}
            className="w-full flex   items-center gap-1 py-1 text-sm rounded-md hover:bg-slate-50"
          >
            Dashboard
          </Link>
        </MenuItem>
        <MenuItem>
          <button
            className="w-full flex   items-center gap-1 py-1 text-sm rounded-md hover:bg-slate-50"
            onClick={handleLogout}
          >
            Log out
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
export default Avatar;
