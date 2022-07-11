import { Menu, Dropdown, message } from "antd"
import { CaretDownOutlined } from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom"
import { connect } from "react-redux"

import logoImg from "@/assets/img/logo.png"
import { useEffect, useState } from "react"
import defaultImg from "@/assets/img/mnml.jpg"
import { addKey, DataType } from "@/store/action"

const Header = (props: any) => {
    const [username, setUsername] = useState("游客")
    const [avatar, setAvatar] = useState(defaultImg)
    const navigate = useNavigate()
    useEffect(() => {
        const username_local = localStorage.getItem("username")
        const avatar_local = localStorage.getItem("avatar")
        setUsername(username_local || "游客")
        setAvatar("http://47.93.114.103:6688/" + avatar_local || defaultImg)
    }, [props.myKey])

    const logout = () => {
        message.success("退出成功，即将返回登录页")
        localStorage.clear() // 清除localStorage中的数据
        setTimeout(() => navigate("/login"), 1500)
    }

    const menu = (
        <Menu>
            <Menu.Item
                key={1}
                onClick={() => {
                    navigate("/means")
                }}
            >
                修改资料
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key={2} onClick={logout}>
                退出登录
            </Menu.Item>
        </Menu>
    )
    return (
        <header>
            <img src={logoImg} alt="" className="logo" />
            <div className="right">
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <img className="avatar" alt="暂无" src={avatar} />
                        <span>{username}</span>
                        <CaretDownOutlined />
                    </a>
                </Dropdown>
            </div>
        </header>
    )
}

const mapStateToProps = (state: DataType) => {
    //需要用哪些属性就写哪些不用整个store都传
    return { myKey: state.myKey }
}

export default connect(mapStateToProps, null)(Header)
