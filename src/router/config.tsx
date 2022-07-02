import Home from "@/pages/Home"
import Edit from "@/pages/Edit"
import { RouteMap } from "@/router/routeMap"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import NotFound from "@/pages/404"
import { Navigate } from "react-router-dom"

import { RouteObject } from "react-router-dom"

const routeConfig: RouteObject[] = [
    {
        path: RouteMap.ROOT,
        element: <Home />,
        children: [
            {
                path: RouteMap.EDIT,
                element: <Edit />,
            },
            {
                path: RouteMap.EDIT_ID,
                element: <Edit />,
            },
        ],
    },
    {
        path: RouteMap.LOGIN,
        element: <Login />,
    },
    {
        path: RouteMap.REGISTER,
        element: <Register />,
    },
    {
        path: RouteMap.NOT_FOUND,
        element: <NotFound />,
    },
    {
        path: "*",
        element: <Navigate to="/404" />,
    },
]

export default routeConfig
