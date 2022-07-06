import React from "react"
import { useRoutes, BrowserRouter } from "react-router-dom"

import Routes from "./config"

// const Routes = () => {
//     const route = useRoutes(routeConfig)
//     return <>{route}</>
// }

export default () => {
    return <BrowserRouter>{Routes}</BrowserRouter>
}
