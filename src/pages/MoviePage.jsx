import useSWR from "swr";
import { API, fetcher } from "../config";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import useDebounce from "../hooks/useDebounce";
import { v4 } from "uuid";

const itemsPerPage = 20;

export default function MoviePage() {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [filter, setFilter] = useState();
  const [pages, setPages] = useState("1");

  const [url, setUrl] = useState(
    // `https://api.themoviedb.org/3/movie/popular?api_key=a6311f0a80a80559e06536fed237a307&page=${pages}`
    API.getMovieList("popular", "pages")
  );
  const fitlerDebounce = useDebounce(filter, 100);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  const { data, error } = useSWR(url, fetcher);
  const isLoading = !data && !error;
  const loading = !data && !error;
  useEffect(() => {
    if (fitlerDebounce) {
      setUrl(
        // `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${fitlerDebounce}&page=${pages}`
        API.getMovieSearch(fitlerDebounce, pages)
      );
    } else {
      setUrl(API.getMovieList("popular", "pages"));
    }
  }, [fitlerDebounce, pages]);

  const movie = data?.results || [];

  useEffect(() => {
    if (!data || !data?.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setPages(event.selected + 1);
  };

  return (
    <div className="py-10 page-container ">
      <div className="flex mb-10 ">
        <div className="flex-1 ">
          <input
            type="text"
            placeholder="Search...."
            className="w-full p-4 bg-slate-800 text-white outline-none"
            onChange={handleChange}
          />
        </div>
        <button className="p-4 bg-primary text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {/* {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
      )} */}
      {isLoading && (
        <div className="grid grid-cols-4 gap-10 mb-10">
          {new Array(itemsPerPage).fill(0).map(() => (
            <MovieCardSkeleton key={v4} />
          ))}
        </div>
      )}
      {!isLoading && (
        <div className="grid grid-cols-4 gap-10 mb-10">
          {!loading &&
            movie.length > 0 &&
            movie.map((item) => (
              <MovieCard key={item.id} item={item}></MovieCard>
            ))}
        </div>
      )}
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
}
