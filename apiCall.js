const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "10923b261ba94d897ac6b81148314a3f";

const apiCall = (path, query) =>
  `${API_URL}/${path}?api_key=${API_KEY}&${query}`;

export default apiCall;
