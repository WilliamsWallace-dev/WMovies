import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import { HomePage } from "../Screens/HomePage";
import CardMain from "../components/CardMain";
import DescritionCard from "../components/CardDescription"
import { DescriptionID } from "../Screens/DescriptionID";


export const AppRoutes = ()=>{

    console.log("AppRoutes")
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element = {<Header></Header>}>
                        <Route path="" element = {<HomePage></HomePage>}></Route>
                        <Route path=":typeContent/:id" element = {<DescriptionID></DescriptionID>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}