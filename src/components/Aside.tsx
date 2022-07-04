import { Menu, MenuProps } from "antd"
import { ReadOutlined, EditOutlined, DatabaseOutlined } from "@ant-design/icons"
import { useLocation, useNavigate } from "react-router-dom"
import { Key, useEffect, useState } from "react"

const Aside = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [defaultKey, setdefaultKey] = useState("")
    const handleClick = (e: { key: string }) => {
        navigate("/" + e.key)
        setdefaultKey(e.key)
    }

    useEffect(() => {
        let path = location.pathname
        let key = path.split("/")[1]
        setdefaultKey(key)
    }, [location.pathname])

    const items = [
        {
            key: "listlist",
            icon: <ReadOutlined />,
            label: `查看文章列表List`,
        },
        {
            key: "listtable",
            icon: <ReadOutlined />,
            label: "查看文章列表Table",
        },
        {
            key: "edit",
            icon: <EditOutlined />,
            label: "文章编辑",
        },
        {
            key: "means",
            icon: <DatabaseOutlined />,
            label: "修改资料",
        },
    ]

    return (
        <Menu
            onClick={handleClick}
            style={{ width: 200 }}
            selectedKeys={[defaultKey]}
            mode="inline"
            className="aside"
            theme="dark"
            items={items}
        />
    )
}

export default Aside
