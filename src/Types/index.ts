//Genre
    export const Genre = { 
        Movies : [
            {
                name : "Ação",
                id : 28
            },
            {
                name : "Aventura",
                id : 12
            },
            {
                name : "Animação",
                id : 16
            },
            {
                name : "Comédia",
                id : 35
            },
            {
                name : "Crime",
                id : 80
            },
            {
                name : "Documentário",
                id : 99
            },
            {
                name : "Drama",
                id : 18
            },
            {
                name : "Família",
                id : 10751
            },
            {
                name : "Fantasia",
                id : 14
            },
            {
                name : "História",
                id : 36
            },
            {
                name : "Terror",
                id : 27
            },
            {
                name : "Música",
                id : 10402
            },
            {
                name : "Mistério",
                id : 9648
            },
            {
                name : "Romance",
                id : 10749
            },
            {
                name : "Ficção Científica",
                id : 878
            },
            {
                name : "Filme de TV",
                id : 10770
            },
            {
                name : "Suspense",
                id : 53
            },
            {
                name : "Guerra",
                id : 10752
            },
            {
                name : "Oeste",
                id : 37
            },

        ],
        Serie : [
            {
                name : "Ação e Aventura",
                id : 10759
            },
            {
                name : "Animação",
                id : 16
            },
            {
                name : "Comédia",
                id : 35
            },
            {
                name : "Crime",
                id : 80
            },
            {
                name : "Documentário",
                id : 99
            },
            {
                name : "Drama",
                id : 18
            },
            {
                name : "Família",
                id : 10751
            },
            {
                name : "Crianças",
                id : 10762
            },
            {
                name : "Mistério",
                id : 9648
            },
            {
                name : "Novidades",
                id : 10763
            },
            {
                name : "Realidade",
                id : 10764
            },
            {
                name : "Ficção Científica e Fantasia",
                id : 10765
            },
            {
                name : "Romance",
                id : 10749
            },
            {
                name : "Ficção Científica",
                id : 878
            },
            {
                name : "Guerra e Política",
                id : 10768
            },
            {
                name : "Oeste",
                id : 37
            },

        ],
        All : [

            {
                name : "Ação",
                id : 28
            },
            {   
                name : "Ação e Aventura",
                id : 10759
            },
            {
                name : "Aventura",
                id : 12
            },
            {
                name : "Animação",
                id : 16
            },
            {
                name : "Comédia",
                id : 35
            },
            {
                name : "Crime",
                id : 80
            },
            {
                name : "Documentário",
                id : 99
            },
            {
                name : "Drama",
                id : 18
            },
            {
                name : "Família",
                id : 10751
            },
            {
                name : "Crianças",
                id : 10762
            },
            {
                name : "Fantasia",
                id : 14
            },
            {
                name : "Novidades",
                id : 10763
            },
            {
                name : "Realidade",
                id : 10764
            },
            {
                name : "Ficção Científica e Fantasia",
                id : 10765
            },
            {
                name : "Guerra e Política",
                id : 10768
            },
            {
                name : "História",
                id : 36
            },
            {
                name : "Terror",
                id : 27
            },
            {
                name : "Música",
                id : 10402
            },
            {
                name : "Mistério",
                id : 9648
            },
            {
                name : "Romance",
                id : 10749
            },
            {
                name : "Ficção Científica",
                id : 878
            },
            {
                name : "Filme de TV",
                id : 10770
            },
            {
                name : "Suspense",
                id : 53
            },
            {
                name : "Guerra",
                id : 10752
            },
            {
                name : "Oeste",
                id : 37
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
    Filme = "Filme",
    Série = "Série",
    Anime = "Anime"
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
