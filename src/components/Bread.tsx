import { HomeOutlined, UserOutlined } from "@ant-design/icons"
import { Breadcrumb } from "antd"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Bread = () => {
    const [breadName, setBreadName] = useState("")
    const { pathname } = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        switch (pathname) {
            case "/listlist":
                setBreadName("查看文章列表List")
                break
            case "/listtable":
                setBreadName("查看文章列表Table")
                break
            case "/edit":
                setBreadName("文章编辑")
                break
            case "/means":
                setBreadName("修改资料")
                break
            default:
                setBreadName(pathname.includes("edit") ? "文章编辑" : "")
                break
        }
    }, [pathname])

    const toHome = () => {
        navigate("/")
    }
    return (
        <Breadcrumb>
            <Breadcrumb.Item onClick={toHome}>
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>{breadName}</Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default Bread
