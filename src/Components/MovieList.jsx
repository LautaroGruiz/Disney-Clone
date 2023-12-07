import { useState, useEffect, useRef } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import GlobalApi from "../Services/GlobalApi";
import HrMovieCard from "./HrMovieCard";
import MovieCard from "./MovieCard";

const MovieList = ({ genreId, index_ }) => {
  const [movieList, setMovieList] = useState([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const containerRef = useRef();

  useEffect(() => {
    getMovieByGenreId();
  }, []);

  const getMovieByGenreId = () => {
    GlobalApi.getMovieByGenreId(genreId).then((resp) => {
      setMovieList(resp.data.results);
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
          className="md:block text-white text-[30px] absolute mx-8 mt-[100px] cursor-pointer z-10"
        />
      )}
      {showRightArrow && (
        <HiChevronRight
          onClick={() => handleScroll("right")}
          className="md:block text-white text-[30px] absolute mx-8 mt-[90px] cursor-pointer right-0 z-10"
        />
      )}
      <div
        className="flex overflow-x-auto gap-8 scrollbar-none pt-5 px-3 pb-10 relative z-1"
        ref={containerRef}
        onScroll={(e) => {
          setShowLeftArrow(e.target.scrollLeft > 0);
          setShowRightArrow(
            e.target.scrollLeft < e.target.scrollWidth - e.target.clientWidth
          );
        }}
      >
        {movieList.map((item, index) => (
          <>
            {index_ % 3 == 0 ? (
              <HrMovieCard movie={item} />
            ) : (
              <MovieCard movie={item} />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
