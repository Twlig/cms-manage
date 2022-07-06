import Home from "@/pages/Home"
import Edit from "@/pages/Edit"
import { RouteMap } from "@/router/routeMap"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import ListList from "@/pages/ListList"
import ListTable from "@/pages/ListTable"
import Means from "@/pages/Means"
import NotFound from "@/pages/404"
import { CheckLogin } from "./middleAuth"

import { Navigate, RouteObject } from "react-router-dom"
import { useMiddlewareRoutes, ReactRouterMiddleware, RoutesMiddlewareObject } from "react-router-middleware-plus"

const routeConfig: RoutesMiddlewareObject[] = [
    {
        path: RouteMap.ROOT,
        element: <Home />,
        middleware: [CheckLogin],
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

// export default routeConfig
// export default useMiddlewareRoutes(routeConfig)   //这种写法要在function组件中使用
export default <ReactRouterMiddleware routes={routeConfig}></ReactRouterMiddleware>
