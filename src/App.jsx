import "./App.css";
import Header from "../src/Components/Header";
import ProductionHouse from "../src/Components/ProductionHouse";
import Slider from "../src/Components/Slider";
import GenreMovieList from "./Components/GenreMovieList";

function App() {
  return (
    <>
      <div>
        <Header />
        <Slider />
        <ProductionHouse />
        <GenreMovieList />
      </div>
    </>
  );
}

export default App;
