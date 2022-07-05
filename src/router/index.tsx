import React from "react"
import { useRoutes, BrowserRouter } from "react-router-dom"

import Routes from "./config"

// const Routes = () => {
//     if(routeConfig) {
//         const route = useRoutes(routeConfig)
//         return <>{route}</>
//     } else {
//         return null
//     }
// }

export default () => {
    return <BrowserRouter>{Routes}</BrowserRouter>
}
