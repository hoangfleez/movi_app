import { SwiperSlide, Swiper } from "swiper/react";
import useSWRC from "swr";
import { API, fetcher } from "../../config";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

export default function Banner({ type = "upcoming" }) {
  const { data } = useSWRC(API.getUpComing(type), fetcher);
  const movies = data?.results || [];

  return (
    <section className="banner h-[700px] page-container mb-20 overflow-hidden">
      <Swiper grabCursor={"true"} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}> </BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
}

function BannerItem({ item }) {
  const navigate = useNavigate();
  const {
    title,
    poster_path,
    id,
    vote_average,
    original_language,
    release_date,
  } = item;
  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t form-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
        className="w-full h-full object-cover object-container rounded-lg overflow-hidden"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold tetx-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="py-2 px-4 border bg-secondary rounded-md flex items-center gap-2">
            {vote_average}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 stroke-[#ffd235]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </span>
          <span className="py-2 px-4 border bg-secondary rounded-md">
            {original_language}
          </span>
          <span className="py-2 px-4 border bg-secondary rounded-md">
            {new Date(release_date).getFullYear()}
          </span>
        </div>

        <Button
          onClick={() => navigate(`/movie/${id}`)}
          className=" flex gap-2"
        >
          Watch now
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
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
