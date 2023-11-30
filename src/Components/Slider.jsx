import { useEffect, useState } from "react";
import GlobalApi from "../Services/GlobalApi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const Slider = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = () => {
    GlobalApi.getTrendingVideos()
      .then((resp) => {
        setMovieList(resp.data.results);
      })
      .catch((error) => {
        console.error("Error al obtener los videos:", error);
        setMovieList([]);
      });
  };

  return (
    <div>
      <HiChevronLeft
        className="hidden md:block text-white text-[30px] absolute 
      mx-8 mt-[150px] cursor-pointer"
      />
      <HiChevronRight
        className="hidden md:block text-white text-[30px] absolute 
      mx-8 mt-[150px] cursor-pointer right-0"
      />
      <div className="flex overflow-x-auto w-full px-16 py-4 scrollbar-none">
        {movieList.map((item) => (
          <img
            key={item.id} // Agrega una clave única para cada imagen
            src={IMAGE_BASE_URL + item.backdrop_path}
            className="min-w-full h-[310px] object-cover object-left-top 
          mr-5 rounded-md"
            alt={item.title} // Añade un atributo alt para accesibilidad
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
