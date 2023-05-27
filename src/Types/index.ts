//Genre
    export const Genre = { 
        Movies : [
            {
                genre : "Ação",
                num : 28
            },
            {
                genre : "Aventura",
                num : 12
            },
            {
                genre : "Animação",
                num : 16
            },
            {
                genre : "Comédia",
                num : 35
            },
            {
                genre : "Crime",
                num : 80
            },
            {
                genre : "Documentário",
                num : 99
            },
            {
                genre : "Drama",
                num : 18
            },
            {
                genre : "Família",
                num : 10751
            },
            {
                genre : "Fantasia",
                num : 14
            },
            {
                genre : "História",
                num : 36
            },
            {
                genre : "Terror",
                num : 27
            },
            {
                genre : "Música",
                num : 10402
            },
            {
                genre : "Mistério",
                num : 9648
            },
            {
                genre : "Romance",
                num : 10749
            },
            {
                genre : "Ficção Científica",
                num : 878
            },
            {
                genre : "Filme de TV",
                num : 10770
            },
            {
                genre : "Suspense",
                num : 53
            },
            {
                genre : "Guerra",
                num : 10752
            },
            {
                genre : "Oeste",
                num : 37
            },

        ],
        Serie : [
            {
                genre : "Ação e Aventura",
                num : 10759
            },
            {
                genre : "Animação",
                num : 16
            },
            {
                genre : "Comédia",
                num : 35
            },
            {
                genre : "Crime",
                num : 80
            },
            {
                genre : "Documentário",
                num : 99
            },
            {
                genre : "Drama",
                num : 18
            },
            {
                genre : "Família",
                num : 10751
            },
            {
                genre : "Crianças",
                num : 10762
            },
            {
                genre : "Mistério",
                num : 9648
            },
            {
                genre : "Novidades",
                num : 10763
            },
            {
                genre : "Realidade",
                num : 10764
            },
            {
                genre : "Ficção Científica e Fantasia",
                num : 10765
            },
            {
                genre : "Romance",
                num : 10749
            },
            {
                genre : "Ficção Científica",
                num : 878
            },
            {
                genre : "Guerra e Política",
                num : 10768
            },
            {
                genre : "Oeste",
                num : 37
            },

        ]
    }

//-----------------------------------------------------------------------------------

//Types

// Context

export interface AppContextType { 
    swiperMovies : SearchTMDBType | null, 
    SwiperMoviesNowPlaying : ()=> Promise<void> 
    swiperMainMovies : SearchTMDBType | null, 
    SwiperMainMoviesNowPlaying : ()=> Promise<void> 
}

export interface SearchTMDBType {
    page : number,
    results : MovieType[],
    total_page : number,
    total_results : number
}

export interface MovieType {
    adult : boolean,
    backdrop_path : string,
    id : number,
    original_languge : string,
    original_title : string,
    overview : string,
    popularity : number,
    poster_path : string,
    release_date : string,
    title : string,
    vote_average : number,
    vote_count : number,
    runtime : null | number,
    video : boolean | string,
    logo : string | null,
    cast : ActorType[],
    genres: null | GenreType[],

}

interface ActorType {
    name : string,
    profile_path : string,
    character : string
}
interface GenreType { 
    id : number,
    name : string
}