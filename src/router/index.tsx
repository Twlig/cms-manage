import React from "react"
import { useRoutes, BrowserRouter } from "react-router-dom"

import routeConfig from "./config"

const Routes = () => {
    const route = useRoutes(routeConfig)
    return <>{route}</>
}

export default () => {
    return (
        <BrowserRouter>
            <Routes></Routes>
        </BrowserRouter>
    )
}
