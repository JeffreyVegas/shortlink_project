import Avatar from "@/components/Avatar";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import { loadUser } from "@/redux/state/user/user.slice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function MainLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      <div className="border-b border-gray-200 py-4">
        <nav className="container mx-auto flex items-center justify-between">
          <a href="/" className="font-bold text-xl ">
            CORTO
          </a>
          {!isAuthenticated ? (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none hover:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                login
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none hover:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                register
              </Link>
            </div>
          ) : (
            <Avatar />
          )}
        </nav>
      </div>
      {children}
    </>
  );
}
export default MainLayout;
