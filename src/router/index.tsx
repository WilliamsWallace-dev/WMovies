
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import { HomePage } from "../Screens/HomePage";
import { DescriptionID } from "../Screens/DescriptionID";
import { LoginForm } from "../components/LoginForm";
import { Register } from "../Screens/Register";
import { ProtecteLayout } from "./ProtectedLayout";
import { AdmProfile } from "../components/AdmProfile";
import { UserProfile } from "../components/UserProfile";
import { CardBoardPage } from "../Screens/CardBoardPage";
import { Footer } from "../components/Footer";
import { SearchPage } from "../Screens/SearchPage";
import { ProtectedLoginRegisteRoute } from "./ProtectedLoginRegisteRoute";
import { useAuth } from "../context/AuthProvider/useAuth";
import { typeAccount } from "../Types";


export const AppRoutes = ()=>{

    const  {user} = useAuth();

    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element = {<><Header></Header><Footer></Footer></>}>
                        <Route path="" element = {<HomePage></HomePage>}></Route>
                        <Route path=":typeContent/descrição/:id" element = {<DescriptionID></DescriptionID>}></Route>
                        <Route path="Login" element={<ProtectedLoginRegisteRoute><LoginForm></LoginForm></ProtectedLoginRegisteRoute>}></Route>
                        <Route path="Register" element={<ProtectedLoginRegisteRoute><Register></Register></ProtectedLoginRegisteRoute>}></Route>
                        <Route path="Profile/:id" element = {user && user.typeOfAccount != typeAccount.admin ? <ProtecteLayout><UserProfile></UserProfile></ProtecteLayout> : <ProtecteLayout><AdmProfile></AdmProfile></ProtecteLayout>}></Route>
                        <Route path="Lista/:typeContent/page/:pg" element = {<CardBoardPage></CardBoardPage>}></Route>
                        <Route path="Search/:search/:pg" element = {<SearchPage></SearchPage>}></Route>
                        <Route path="*" element = {<HomePage></HomePage>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}