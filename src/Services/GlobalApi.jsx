import axios from "axios";

const movieBaseUrl = "https://api.themoviedb.org/3";
const api_key = "e530ffbc8ead3d338f994287520154e5";
//https://api.themoviedb.org/3/movie/550?api_key=e530ffbc8ead3d338f994287520154e5

const getTrendingVideos = axios.get(
  movieBaseUrl + "/trending/all/day?api_key" + api_key
);

export default {
  getTrendingVideos,
};
