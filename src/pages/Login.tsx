import { Button, Form, Input, message } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom"
import "./less/login.less"
import logoImg from "@/assets/img/logo.png"
import axios, { loginDataType } from "@/utils/axios"
import { AxiosResponse } from "axios"

const Login = () => {
    const navigate = useNavigate()
    const onFinish = (values: any) => {
        axios
            .post("/login", {
                username: values.username,
                password: values.password,
            })
            .then((res: loginDataType) => {
                if (res.errCode === 0) {
                    message.success(res.message)
                    localStorage.setItem("avatar", res.data.avatar)
                    localStorage.setItem("cms-token", res.data["cms-token"])
                    localStorage.setItem("editable", res.data.editable)
                    localStorage.setItem("player", res.data.player)
                    localStorage.setItem("username", res.data.username)
                    setTimeout(() => {
                        navigate("/")
                    }, 1000)
                } else {
                    message.error(res.message)
                }
            })
    }

    const onFinishFailed = (errorInfo: any) => {
        message.error(errorInfo)
    }

    return (
        <div className="login">
            <div className="login_box">
                <img src={logoImg} alt="" />
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
                        <Input
                            size="large"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="请输入用户名"
                        />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
                        <Input.Password
                            size="large"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="请输入密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Link to="/register">还没账号？立即注册</Link>
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" type="primary" htmlType="submit" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login
