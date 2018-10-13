const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "10923b261ba94d897ac6b81148314a3f";
const IMAGE_URL = "https://image.tmdb.org/t/p/w";

const apiCall = (path, query) =>
  `${API_URL}/${path}?api_key=${API_KEY}&${query}`;

export const apiImage = (path, size = 200) => `${IMAGE_URL}${size}/${path}`;

export default apiCall;
