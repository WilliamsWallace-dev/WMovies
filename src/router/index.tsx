import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import { HomePage } from "../Screens/HomePage";
import CardMain from "../components/CardMain";
import DescritionCard from "../components/CardDescription"
import { DescriptionID } from "../Screens/DescriptionID";
import { LoginForm } from "../components/LoginForm";
import { Register } from "../Screens/Register";
import { ProtecteLayout, RegisterToProfile } from "./ProtectedLayout";
import { AdmProfile } from "../components/AdmProfile";
import { UserProfile } from "../components/UserProfile";
import { CardBoardPage } from "../Screens/CardBoardPage";


export const AppRoutes = ()=>{

    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element = {<Header></Header>}>
                        <Route path="" element = {<HomePage></HomePage>}></Route>
                        <Route path=":typeContent/:id" element = {<DescriptionID></DescriptionID>}></Route>
                        <Route path="Login" element={<LoginForm></LoginForm>}></Route>
                        <Route path="Register" element={<RegisterToProfile><Register></Register></RegisterToProfile>}></Route>
                        <Route path="Profile/:id" element = {<ProtecteLayout><UserProfile></UserProfile></ProtecteLayout>}></Route>
                        <Route path=":typeContent" element = {<CardBoardPage></CardBoardPage>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}