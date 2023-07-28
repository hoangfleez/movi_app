import MovieList from "../components/movie/MovieList";

export default function Home() {
  return (
    <>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white text-3xl font-bold pb-10">
          Now playing
        </h2>
        <MovieList type="now_playing" />
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white text-3xl font-bold pb-10">
          Trending
        </h2>
        <MovieList type="top_rated" />
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white text-3xl font-bold pb-10">
          Top rated
        </h2>
        <MovieList type="popular" />
      </section>
    </>
  );
}
