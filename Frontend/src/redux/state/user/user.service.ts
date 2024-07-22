import axios from "axios";
import { Login, User } from "@/@types";

const register = async (user: User) => {
  const { data } = await axios.post(
    "http://localhost:4000/api/v1/register",
    user,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return data;
};

const login = async (dataUser: Login) => {
  const { data } = await axios.post(
    "http://localhost:4000/api/v1/login",
    dataUser,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return data;
};

const loadUser = async () => {
  const { data } = await axios.get("http://localhost:4000/api/v1/loaduser", {
    withCredentials: true,
  });
  return data;
};

const logout = async () => {
  const { data } = await axios.get("http://localhost:4000/api/v1/logout", {
    withCredentials: true,
  });
  return data;
};

const userService = {
  register,
  login,
  loadUser,
  logout,
};

export default userService;
