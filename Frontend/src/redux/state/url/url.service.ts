import { Url } from "@/@types";
import axios from "axios";

const createUrl = async (urlData: Url) => {
  const { data } = await axios.post(
    "http://localhost:4000/api/v1/url",
    urlData,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return data;
};

const getAllUrls = async () => {
  const { data } = await axios.get("http://localhost:4000/api/v1/urls", {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return data;
};

const updateUrl = async (urlData: Url) => {
  const { data } = await axios.put(
    `http://localhost:4000/api/v1/url`,
    urlData,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return data;
};

const removeUrl = async (urlId: string) => {
  const { data } = await axios.delete(
    `http://localhost:4000/api/v1/url/${urlId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return data;
};

const urlService = {
  createUrl,
  getAllUrls,
  removeUrl,
  updateUrl,
};

export default urlService;
