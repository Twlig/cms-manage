import React from "react"
import ReactDOM from "react-dom/client"

import "@/assets/style/base.less"

import BaseRouter from "./router"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <BaseRouter />
    // <React.StrictMode>
    //     <BaseRouter />
    // </React.StrictMode>
    //防止执行两次，不然development的时候发生两次。但其实生成环境是不会的。
)
