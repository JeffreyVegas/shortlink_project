import axios from "axios";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const getDataUrl = async (shortUrl: string) => {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/url?shorturl=${shortUrl}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false };
  }
};

const addClick = async (idUrl: string) => {
  try {
    const { data } = await axios.put(
      `http://localhost:4000/api/v1/url/${idUrl}/click`
    );
    return data;
  } catch (error) {
    console.error("Error adding click:", error);
    return { success: false };
  }
};

function Redirect() {
  const location = useLocation();
  const hasFetchedRef = useRef(false);
  const currentUrl = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;

  useEffect(() => {
    if (hasFetchedRef.current) return; // Evita ejecución si ya se ejecutó

    hasFetchedRef.current = true;

    async function fetchData() {
      const data = await getDataUrl(currentUrl);
      if (data.success) {
        console.log("why");
        const idUrl = data.url._id;
        await addClick(idUrl);
        //navigate to the url from data.url.url
        window.location.href = data.url.url;
      }
    }
    fetchData();
  }, []);

  return <div>url invalid</div>;
}
export default Redirect;
