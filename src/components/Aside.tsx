import { Menu, MenuProps } from "antd"
import { ReadOutlined, EditOutlined, DatabaseOutlined } from "@ant-design/icons"

type MenuItem = Required<MenuProps>["items"][number]

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem
}

const items: MenuProps["items"] = [
    getItem("Navigation One", "list", <ReadOutlined />),

    getItem("Navigation Two", "editArticle", <EditOutlined />),

    getItem("Navigation Three", "editInfo", <DatabaseOutlined />),
]

const Aside = () => {
    const onClick: MenuProps["onClick"] = e => {
        console.log("click ", e)
    }

    return <Menu onClick={onClick} style={{ width: 256 }} mode="inline" items={items} />
}

export default Aside
