import { useEffect, useState, useRef } from "react";
import GlobalApi from "../Services/GlobalApi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import "../Style/Slider.css"

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const Slider = () => {
  const [movieList, setMovieList] = useState([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const containerRef = useRef();

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

  const handleScroll = (scrollDirection) => {
    const container = containerRef.current;

    if (container) {
      if (scrollDirection === "right") {
        container.scrollBy({
          left: container.offsetWidth,
          behavior: "smooth",
        });
      } else if (scrollDirection === "left") {
        container.scrollBy({
          left: -container.offsetWidth,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div>
      {showLeftArrow && (
        <HiChevronLeft
          onClick={() => handleScroll("left")}
          className="md:block text-white text-[30px] absolute mx-8 mt-[180px] cursor-pointer"
        />
      )}
      {showRightArrow && (
        <HiChevronRight
          onClick={() => handleScroll("right")}
          className="md:block text-white text-[30px] absolute mx-8 mt-[180px] cursor-pointer right-0"
        />
      )}
      <div
        id="slider-container"
        className="flex overflow-x-auto w-full px-16 py-4 scrollbar-none slider-container"
        ref={containerRef}
        onScroll={(e) => {
          setShowLeftArrow(e.target.scrollLeft > 0);
          setShowRightArrow(
            e.target.scrollLeft < e.target.scrollWidth - e.target.clientWidth
          );
        }}
      >
        {movieList.map((item) => (
          <img
            key={item.id}
            src={IMAGE_BASE_URL + item.backdrop_path}
            className="min-w-full h-[400px] object-cover object-left-top mr-8 
            rounded-md hover:border-[4px] border-gray-400 transition-all duration-100 ease-in"
            alt={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
