import axios from "axios";

const movieBaseUrl = "https://api.themoviedb.org/3";
const api_key = "eb5d41372a40f4c2ed7d8c84aea53e11";

const getTrendingVideos = () => {
  return axios.get(`${movieBaseUrl}/trending/all/day?api_key=${api_key}`);
};

export default {
  getTrendingVideos,
};
//https://api.themoviedb.org/3/trending/all/day?api_key=eb5d41372a40f4c2ed7d8c84aea53e11