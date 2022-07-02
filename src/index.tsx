import React from "react"
import ReactDOM from "react-dom/client"
import "@/style/base.css"

import BaseRouter from "./router"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <React.StrictMode>
        <BaseRouter />
    </React.StrictMode>
)
