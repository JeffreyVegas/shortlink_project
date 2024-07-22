import CardUrl from "./components/CardUrl";
import Layout from "./components/Layout";
import CreateModal from "./components/CreateModal";
import Sortby from "./components/Sortby";
import { Search as SearchIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import { useEffect, useState } from "react";
import { getAllUrls } from "@/redux/state/url/url.slice";

function Dashboard() {
  const { urls } = useAppSelector((state) => state.url);

  const dispatch = useAppDispatch();
  const [sortedUrls, setSortedUrls] = useState(urls);

  useEffect(() => {
    dispatch(getAllUrls());
  }, []);

  useEffect(() => {
    setSortedUrls(urls);
  }, [urls]);

  const sortbyDate = () => {
    const sortedUrls = [...urls].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
    setSortedUrls(sortedUrls);
  };

  const searchInUrls = (search: string) => {
    const filteredUrls = urls.filter((url) => {
      const shortUrl = url.shortUrl && url.shortUrl.toLowerCase();
      const baseUrl = url.url && url.url.toLowerCase();
      return shortUrl?.includes(search) || baseUrl.includes(search);
    });
    setSortedUrls(filteredUrls);
  };

  return (
    <Layout>
      <div className="container mx-auto px-3 sm:px-0">
        <div className="flex justify-between items-center py-8 ">
          <h3 className="text-xl ">LINKS</h3>
          <CreateModal />
        </div>

        <div className="flex justify-between mb-4 gap-6 items-center">
          <div className="relative flex-1">
            <input
              className="border w-full p-2 rounded-md shadow-md"
              type="text"
              placeholder="search..."
              onChange={(e) => searchInUrls(e.target.value)}
            />
            <SearchIcon className="absolute right-0 top-0 mr-3 mt-3 size-5 text-gray-400" />
          </div>
          <Sortby sortbyDate={sortbyDate} />
        </div>

        <div className="flex flex-col gap-3">
          {sortedUrls.map((url) => (
            <CardUrl key={url._id} url={url} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
export default Dashboard;
