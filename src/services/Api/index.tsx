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

import { collection, addDoc, getDocs, doc, setDoc, deleteDoc, getDoc, updateDoc   } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { CardType, IUser, typeVideo } from '../../Types';
import { avatarImg } from '../../assets/avatarImg';

//Autenticação - Usuário
export const AddDocumentDbUser = async (collectionName : string,data : IUser)=>{

  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

export const CreateUser = async (userCreated : IUser)=>{

  return createUserWithEmailAndPassword(auth, userCreated.email, userCreated.password)
  .then((userCredential) => {
    // Signed in
    const id = userCredential.user.uid;
    // console.log(userCredential)
    // ...
    setDoc(doc(db, "User", `${id}`),{
      id : id,
      email : userCreated.email,
      password : userCreated.password,
      username : userCreated.username,
      favorites : [],
      seeLater  : [],
      typeOfAccount : "user",
      avatar : avatarImg[Math.round(Math.random()*(avatarImg.length-1))]
  })
      .then(()=>{
        console.log("UserDocument written");
      })
      .catch((e)=>{
        console.error("Error adding document: ", e);
      })
  })
  .catch((error) => {
    const errorCode = error.code;
    // const errorMessage = error.message;
    return errorCode
    // ..
  });

 

}


//Banco de dados

// eslint-disable-next-line react-refresh/only-export-components
export const getDocumentDbCardList = async (collectionName : string)=>{
  
  const querySnapshot = await getDocs(collection(db, collectionName));
  let list : CardType[] = [];
  querySnapshot.forEach((doc) => {
    list = [...list,doc.data() as CardType]
  });
  return list;
}

export async function  getDocument <typeDocument> (collectionName : string , id : string){

  const docRef = doc(db, collectionName, `${id}`);
  const docSnap = await getDoc(docRef);
  if(id != "d71VydFfu8ONnfoQiKKjCDjlh7w2")
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data() as typeDocument;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return {} as typeDocument
    }
}

export const updateDocumentUser = async (attribute : "favorites" | "seeLater" , card : CardType, user : IUser,)=>{

  const docRef = doc(db, "User", `${user.id}`);

  // console.log(user)

  // Set the "capital" field of the city 'DC'
  if(attribute == "favorites"){
    if(user.favorites?.find((cardFavorite)=> cardFavorite.id == card.id)){
        
        await updateDoc(docRef, {
          "favorites" : user.favorites?.filter((cardFavorite)=> cardFavorite.id != card.id)
        });

    }else{

        if(user.favorites && user.favorites.length >= 1){
          await updateDoc(docRef, {
            "favorites" : [...user.favorites, card]
          });
        }else{
            await updateDoc(docRef, {
              "favorites" : [card]
            });
        }
      } 
    }else if (attribute == "seeLater"){
            if(user.seeLater?.find((cardSeeLater)=> cardSeeLater.id == card.id)){

              await updateDoc(docRef, {
                // eslint-disable-next-line no-unsafe-optional-chaining
                "seeLater" : [...user.seeLater?.filter((cardSeeLater)=> cardSeeLater.id != card.id)]
              });

              }else{

                if(user.seeLater && user.seeLater.length >= 1){
                await updateDoc(docRef, {
                  "seeLater" : [...user.seeLater, card]
                });
                }else{
                    await updateDoc(docRef, {
                      "seeLater" : [card]
                    });
                }

              }
          }
}

export const updateDocumentUserAvatar = async (user : IUser)=>{

  const docRef = doc(db, "User", `${user.id}`);
        
        await updateDoc(docRef, {
          "avatar" : user.avatar
        });

    }

export const DelDocumentDb = async (collectionName : string,data : CardType)=>{

  try {
    await deleteDoc(doc(db, collectionName, `${data.id}`));
    console.log("Document deleted with ID: ", data.id);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }

}

export const SetDocumentDbCardType = async (collectionName : "Filme" | "Série" | "Anime" | undefined, data : CardType, MainList? : boolean)=>{

  

  if(collectionName == "Filme"){
    
    let url = `${URLValues.movies}${data.id}${URLValues.api_key}&language=pt-BR`
    data = await getTmdb(url)

    data.typeContent = collectionName;
    data.watchedToday = Date.now()

    url = `${URLValues.movies}${data.id}/videos${URLValues.api_key}&language=pt-BR`
    let videosResults = await getTmdb(url)

    if(videosResults.results.length){
      videosResults.results.forEach((video:any)=>{
        if(!data.video && video.type == "Trailer"){
          data.video = video;
        }
          
      })
    }else {
      url = `${URLValues.movies}${data.id}/videos${URLValues.api_key}&language=en-US`
      videosResults = await getTmdb(url)
      if(videosResults.results.length){
        videosResults.results.forEach((video:any)=>{
          if(!data.video && video.type == "Trailer"){
            data.video = video;
          }
            
        })
      }else data.video = null
    }

    url = `${data.title ? URLValues.movies : URLValues.movies}${data.id}/images${URLValues.api_key}&include_image_language=pt&language=pt-BR`
    let imagesResults = await getTmdb(url)

    if(imagesResults.logos){
      url = `${data.title ? URLValues.movies : URLValues.movies}${data.id}/images${URLValues.api_key}&include_image_language=en&language=pt-BR`
      imagesResults = await getTmdb(url)
    }
    if(imagesResults.logos[0])
                data.logo = imagesResults.logos[0].file_path;
                else data.logo = null
    
    url = `${data.title ? URLValues.movies : URLValues.movies}${data.id}/credits${URLValues.api_key}&include_image_language=pt&language=pt-BR`
    const creditsResults = await getTmdb(url)
    data.credits = creditsResults.cast.slice(0,4);
    console.log(data)

    if(MainList){
      try {
        await setDoc(doc(db, "MainMovies", `${data.id}`),data);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }else{
      try {
        await setDoc(doc(db, collectionName, `${data.id}`),data);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    
  }else if(collectionName == "Série"){
          let url = `${URLValues.seriesAnimes}${data.id}${URLValues.api_key}&language=pt-BR`
          data = await getTmdb(url)

          data.typeContent = collectionName;
          data.watchedToday = Date.now()

          url = `${URLValues.seriesAnimes}${data.id}/videos${URLValues.api_key}&language=pt-BR`
          let videosResults = await getTmdb(url)

          if(videosResults.results.length){
            videosResults.results.forEach((video : typeVideo)=>{
              if(!data.video && video.type == "Trailer"){
                data.video = video;
              }
                
            })
          }else {
            url = `${URLValues.seriesAnimes}${data.id}/videos${URLValues.api_key}&language=en-US`
            videosResults = await getTmdb(url)
            if(videosResults.results.length){
              videosResults.results.forEach((video : typeVideo)=>{
                if(!data.video && video.type == "Trailer"){
                  data.video = video;
                }
                  
              })
            }else data.video = null
          }
          
          url = `${data.title ? URLValues.movies : URLValues.seriesAnimes}${data.id}/images${URLValues.api_key}&include_image_language=pt&language=pt-BR`
          let imagesResults = await getTmdb(url)

          if(imagesResults.logos){
            url = `${data.title ? URLValues.movies : URLValues.seriesAnimes}${data.id}/images${URLValues.api_key}&include_image_language=en&language=pt-BR`
            imagesResults = await getTmdb(url)
          }
          if(imagesResults.logos[0])
                data.logo = imagesResults.logos[0].file_path;
                else data.logo = null

          url = `${data.title ? URLValues.movies : URLValues.seriesAnimes}${data.id}/credits${URLValues.api_key}&include_image_language=pt&language=pt-BR`
          const creditsResults = await getTmdb(url)
          data.credits = creditsResults.cast.slice(0,4);
          

          if(MainList){
            try {
              await setDoc(doc(db, "MainSeries", `${data.id}`),data);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          }else{
            try {
              await setDoc(doc(db, collectionName, `${data.id}`),data);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          }
    }else if(collectionName == "Anime"){

              let url = `${data.title ? URLValues.movies : URLValues.seriesAnimes }${data.id}${URLValues.api_key}&language=pt-BR`
              data = await getTmdb(url)

              data.typeContent = collectionName;
              data.watchedToday = Date.now()
              
              url = `${data.title ? URLValues.movies : URLValues.seriesAnimes}${data.id}/videos${URLValues.api_key}&language=pt-BR`
              let videosResults = await getTmdb(url)

              if(videosResults.results.length){
                videosResults.results.forEach((video : typeVideo)=>{
                  if(!data.video && video.type == "Trailer"){
                    data.video = video;
                  }
                    
                })
              }else {
                url = `${data.title ? URLValues.movies : URLValues.seriesAnimes}${data.id}/videos${URLValues.api_key}&language=en-US`
                videosResults = await getTmdb(url)
                if(videosResults.results.length){
                  videosResults.results.forEach((video : typeVideo)=>{
                    if(!data.video && video.type == "Trailer"){
                      data.video = video;
                    }
                      
                  })
                }else data.video = null
              }

              url = `${data.title ? URLValues.movies : URLValues.seriesAnimes}${data.id}/images${URLValues.api_key}&include_image_language=pt&language=pt-BR`
              let imagesResults = await getTmdb(url)

              if(imagesResults.logos){
                url = `${data.title ? URLValues.movies : URLValues.seriesAnimes}${data.id}/images${URLValues.api_key}&include_image_language=en&language=pt-BR`
                imagesResults = await getTmdb(url)
              }
              if(imagesResults.logos[0])
                data.logo = imagesResults.logos[0].file_path;
                else data.logo = null

              // url = `${data.title ? URLValues.movies : URLValues.seriesAnimes}${data.id}/credits${URLValues.api_key}&include_image_language=pt&language=pt-BR`
              // const creditsResults = await getTmdb(url)
              // console.log(creditsResults.cast)
              // data.credits = creditsResults.cast.slice(0,4);

              if(MainList){
                try {
                  await setDoc(doc(db, "MainAnimes", `${data.id}`),data);
                } catch (e) {
                  console.error("Error adding document: ", e);
                }
              }else{
                try {
                  await setDoc(doc(db, collectionName, `${data.id}`),data);
                } catch (e) {
                  console.error("Error adding document: ", e);
                }
              }
    }

    return data;
}