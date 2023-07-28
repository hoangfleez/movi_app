import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import Home from "./pages/Home";
import Banner from "./components/banner/Banner";
import MoviePage from "./pages/MoviePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Main />}>
          <Route
            path=""
            element={
              <>
                <Banner />
                <Home />
              </>
            }
          />
          <Route path="/movie" element={<MoviePage />}></Route>
          <Route path="/movie/:movieId" element={<MovieDetailsPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
