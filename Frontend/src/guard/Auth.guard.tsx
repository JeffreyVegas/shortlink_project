import { useAppSelector } from "@/hooks/redux.hook";
import { Navigate, Outlet } from "react-router-dom";

function AuthGuard() {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.user);

  return isLoading === null ? (
    <div></div>
  ) : isLoading ? (
    <div>Loading...</div>
  ) : isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}
export default AuthGuard;
