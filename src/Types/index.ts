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

//Enum
export enum typeAccount {
    admin = "admin",
    user = "user"
}

//Types
export enum TypeContent  {
    Filmes = "Filmes",
    Series = "Séries",
    Animes = "Animes"
}
// Context
export interface AppContextType { 
    moviesList : CardType [], 
    seriesList : CardType [],  
    animesList : CardType [], 
    GetLists : ()=> Promise<void> ,
    SetLists: (typeList: "Filme" | "Série" | "Anime", data: CardType) => void,
    DelCard: (typeList: "Filme" | "Série" | "Anime", data: CardType) => Promise<void>
}

export interface SearchTMDBType {
    page : number,
    results : CardType[],
    total_page : number,
    total_results : number
}

export interface CardType {
    typeContent? : "Filme" | "Série" | "Anime", 
    adult : boolean,
    backdrop_path : string,
    id : number,
    original_languge : string,
    original_title? : string,
    overview : string,
    popularity : number,
    poster_path : string,
    release_date : string,
    first_air_date : string, //Série
    title : string,
    name : string,  //Série
    vote_average : number,
    vote_count : number,
    runtime : null | number,
    video? : boolean | typeVideo | null,
    logo : string | null,
    cast : ActorType[],
    genres: null | GenreType[],

}


interface typeVideo { 
    id : string,
    key : string,
    name : string
    site : string,
    size : number,
    type : string
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

//AuthProvider

export interface IUserRegister extends IUser{
    checkPassword : string
}

export interface IUser {
    id? : string,
    email : string,
    password : string,
    username? : string,
    favorites? : CardType[],
    seeLater ? : CardType[],
    typeOfAccount? : "admin" | "user"
}

// export interface IAdmin {
//     id? : string,
//     email? : string | null,
//     password? : string,
//     username? : string,
// }

export interface IContext{
    user : IUser,
    authenticate : (email : string , password : string) => Promise<void>,
    logout : () => void,
    createAccount: (userCreated: IUser) => void,
    getUserDocument: (id: string) => Promise<void>,
    updateUserCards: (attribute: "favorites" | "seeLater", card: CardType, user: IUser) => void
}

export interface IAuthProvider {
    children : JSX.Element
}

export interface TypeSearch {
    typeContent : "Filme" | "Série" | "Anime", 
    typeOp : "Gerenciar" | "Adicionar"
}


export interface Search { 
    text  : string,
    cards : CardType[],
}
