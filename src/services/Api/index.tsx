import axios from 'axios'

export enum URLValues { 
  api_key = "?api_key=13f3c3621ab303e180ca6fd8ba0df8e1",
  movies = "movies/",
  series = "tv/",
  topRated = "top_rated",
  searchMovie = "search/movie",
  searchSerie = "search/tv",
}

export const tmdb = axios.create({
    baseURL: `https://api.themoviedb.org/3/`
  });