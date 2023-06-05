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




  //Firebase

  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5ZUCDrRkNMF_tSvJlmjnosXaBrdDdKic",
  authDomain: "wmovies-438a1.firebaseapp.com",
  projectId: "wmovies-438a1",
  storageBucket: "wmovies-438a1.appspot.com",
  messagingSenderId: "135892474190",
  appId: "1:135892474190:web:6510d53bdce3ca0863661f",
  measurementId: "G-BCNFYRDLZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
