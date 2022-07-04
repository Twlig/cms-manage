import React from "react"
import ReactDOM from "react-dom/client"

import "@/assets/style/base.less"

import BaseRouter from "./router"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <React.StrictMode>
        <BaseRouter />
    </React.StrictMode>
)
