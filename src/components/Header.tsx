import { Menu, Dropdown, message } from "antd"
import { CaretDownOutlined } from "@ant-design/icons"

const Header = () => {
    const menu = (
        <Menu>
            <Menu.Item key={1}>修改资料</Menu.Item>
            <Menu.Divider />
            <Menu.Item key={2}>退出登录</Menu.Item>
        </Menu>
    )

    return (
        <header>
            <img alt="" className="logo" />
            <div className="right">
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <img className="avatar" alt="暂无" />
                        <span>"username"</span>
                        <CaretDownOutlined />
                    </a>
                </Dropdown>
            </div>
        </header>
    )
}

export default Header
