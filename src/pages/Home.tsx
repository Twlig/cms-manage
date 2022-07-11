import { PropsWithChildren, useState } from "react"
import { Outlet } from "react-router-dom"
import { Layout } from "antd"

import Aside from "@/components/Aside"
import Header from "@/components/Header"
import Bread from "@/components/Bread"

import "./less/home.less"

const { Sider, Content } = Layout

const Home = (props: any) => {
    return (
        <Layout id="app">
            <Header />
            <div className="container">
                <Aside />
                <div className="container_box">
                    <Bread />
                    <div className="container_content">
                        <Outlet />
                    </div>
                </div>
            </div>
            <footer>Copyright &copy; 2022 Author Twilg</footer>
        </Layout>
    )
}

export default Home
