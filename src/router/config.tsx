import Home from "@/pages/Home"
import Edit from "@/pages/Edit"
import { RouteMap } from "@/router/routeMap"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import ListList from "@/pages/ListList"
import ListTable from "@/pages/ListTable"
import Means from "@/pages/Means"
import NotFound from "@/pages/404"

import { Navigate, RouteObject } from "react-router-dom"

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
            {
                path: RouteMap.LISTLIST,
                element: <ListList />,
            },
            {
                path: RouteMap.LISTTABLE,
                element: <ListTable />,
            },
            {
                path: RouteMap.MEANS,
                element: <Means />,
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
        element: <Navigate to="/404" replace={true} />,
    },
]

export default routeConfig
