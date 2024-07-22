import { Route, Routes } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

function RoutesNotFound({ children }: Props) {
  return (
    <Routes>
      {children}
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
}
export default RoutesNotFound;
