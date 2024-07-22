import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import MainLayout from "./layouts/MainLayout";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";

import { Provider } from "react-redux";
import store from "./redux/store";
import AuthGuard from "./guard/Auth.guard";
import Redirect from "./pages/Redirect";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/l/:key" element={<Redirect />} />
              {/* private routes */}
              <Route element={<AuthGuard />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route path="*" element={<h1>404 - Not Found</h1>} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
