import { useParams } from "react-router-dom";
import useSWR from "swr";
import { API, API_KEY, fetcher } from "../config";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";

//api.themoviedb.org/3/movie/{movie_id}?api_key=${API_KEY}`,
export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`,
    fetcher
  );

  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative mb-10 ">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover "
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[300px]">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt=""
          className="w-full h-full object-cover max-w-[500px] mx-auto -mt-[200px] relative z-10 rounded-xl pb-10"
        />
      </div>
      <h1 className="text-center text-4xl font-bold text-white mb-10">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="flex items-center gap-x-5 justify-center mb-10">
          {genres.map((item) => (
            <span
              key={item.id}
              className="py-2 px-4 border-primary text-primary border rounded-xl"
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      <MovieCredits />
      <MovieVideos />
      <MovieSimilar />
    </div>
  );
}

//api.themoviedb.org/3/movie/{movie_id}/credits?api_key=${API_KEY}
function MovieCredits() {
  const { movieId } = useParams();

  const { data } = useSWR(
    // `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`,
    API.getMovieMeta(movieId, "credits"),
    fetcher
  );
  console.log(data);
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <>
      <h2 className="text-center text-3xl mb-5 font-bold">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => (
          <div className="cast-item" key={item.id}>
            <img
              src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
              alt=""
              className="w-full h-[350px] object-cover  rounded-lg"
            />
            <h3 className="text-xl font-medium">{item.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

//<iframe width="894" height="503" src="https://www.youtube.com/embed/${item.key}" title="JustaTee, Chillies, Rhymastic, Vũ. - Những Bài Hát Nhạc Trẻ Cực Chill Hay Nhất" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
function MovieVideos() {
  const { movieId } = useParams();

  const { data } = useSWR(
    // `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`,
    API.getMovieMeta(movieId, "videos"),
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {results.slice(0, 2).map((item) => (
          <div key={item.id} className="w-full aspect-video">
            <iframe
              width="894"
              height="503"
              src={`https://www.youtube.com/embed/${item.key}`}
              title="Yotuber video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full object-fill"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieSimilar() {
  const { movieId } = useParams();
  const { data } = useSWR(
    // `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`,
    API.getMovieMeta(movieId, "similar"),
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
