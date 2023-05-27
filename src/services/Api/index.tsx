import axios from 'axios'

export enum URLValues { 
  api_key = "?api_key=13f3c3621ab303e180ca6fd8ba0df8e1",
  img_path = "https://image.tmdb.org/t/p/w500/",
  img_path_original = "https://image.tmdb.org/t/p/original/",
  movies = "movie/",
  series = "tv/",
  nowPlaying = "now_playing",
  searchMovie = "search/movie",
  searchSerie = "search/tv",
}

export const tmdb = axios.create({
    baseURL: `https://api.themoviedb.org/3/`
  });