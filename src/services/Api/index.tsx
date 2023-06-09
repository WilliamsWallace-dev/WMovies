import axios from 'axios'

export enum URLValues { 
  api_key = "?api_key=13f3c3621ab303e180ca6fd8ba0df8e1",
  img_path = "https://image.tmdb.org/t/p/w500/",
  img_path_original = "https://image.tmdb.org/t/p/original/",
  movies = "movie/",
  seriesAnimes = "tv/",
  nowPlaying = "now_playing",
  searchMovie = "search/movie",
  searchSerieAnimes = "search/tv",
}

export const tmdb = axios.create({
    baseURL: `https://api.themoviedb.org/3/`
  });

export const getTmdb = async (url : string)=>{
    const res = await tmdb.get(url);
    // console.log(res.data)
    return res.data;
}


  //Firebase

  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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
export const db = getFirestore(app);

import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { CardType, IUser } from '../../Types';

export const AddDocumentDb = async (collectionName : string,data : IUser)=>{

  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

export const SetDocumentDbCardType = async (collectionName : string, data : CardType)=>{

  if(collectionName == "Filme"){
    let url = `${URLValues.movies}${data.id}${URLValues.api_key}&language=pt-BR`
    data = await getTmdb(url)

    url = `${URLValues.movies}${data.id}/videos${URLValues.api_key}&language=pt-BR`
    const videosResults = await getTmdb(url)

    if(videosResults.results.length){
        data.video = videosResults.results[0] 
    }else data.video = false

    try {
      await setDoc(doc(db, collectionName, `${data.id}`),data);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }else if(collectionName == "Série"){
          let url = `${URLValues.seriesAnimes}${data.id}${URLValues.api_key}&language=pt-BR`
          data = await getTmdb(url)

          url = `${URLValues.seriesAnimes}${data.id}/videos${URLValues.api_key}&language=pt-BR`
          const videosResults = await getTmdb(url)

          if(videosResults.results.length){
              data.video = videosResults.results[0] 
            }else data.video = false

          try {
            await setDoc(doc(db, collectionName, `${data.id}`),data);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }else if(collectionName == "Anime"){

              let url = `${data.title ? URLValues.movies : URLValues.seriesAnimes }${data.id}${URLValues.api_key}&language=pt-BR`
              data = await getTmdb(url)
              
              url = `${data.title ? URLValues.movies : URLValues.seriesAnimes}${data.id}/videos${URLValues.api_key}&language=pt-BR`
              const videosResults = await getTmdb(url)

              if(videosResults.results.length){
                data.video = videosResults.results[0] 
              }else data.video = false

              try {
                await setDoc(doc(db, collectionName, `${data.id}`),data);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
    }


}