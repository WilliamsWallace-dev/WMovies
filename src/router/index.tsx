import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import { HomePage } from "../Screens/HomePage";
import CardMain from "../components/CardMain";
import DescritionCard from "../components/CardDescription"
import { DescriptionID } from "../Screens/DescriptionID";
import { LoginForm } from "../components/LoginForm";
import { Register } from "../Screens/Register";
import { ProtecteLayout } from "./ProtectedLayout";
import { Profile } from "../components/Profile";


export const AppRoutes = ()=>{

    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element = {<Header></Header>}>
                        <Route path="" element = {<HomePage></HomePage>}></Route>
                        <Route path=":typeContent/:id" element = {<DescriptionID></DescriptionID>}></Route>
                        <Route path="Login" element={<LoginForm></LoginForm>}></Route>
                        <Route path="Register" element={<Register></Register>}></Route>
                        <Route path="Profile" element = {<ProtecteLayout><Profile></Profile></ProtecteLayout>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}