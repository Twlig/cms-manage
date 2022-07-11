import { Button, Form, Input, message } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom"
import "./less/register.less"
import logoImg from "@/assets/img/logo.png"
import axios from "@/utils/axios"
import { loginDataType } from "@/utils/axios"

const Register = () => {
    const navigate = useNavigate()
    const onFinish = (values: any) => {
        axios.post("/register", { username: values.username, password: values.password }).then((res: loginDataType) => {
            if (res.errCode === 0) {
                message.success(res.message)
                setTimeout(() => {
                    navigate("/login")
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
        <div className="register">
            <div className="register_box">
                <img src={logoImg} alt="" />
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: "请输入用户名" },
                            { pattern: new RegExp("^.{3,20}$", "g"), message: "用户名长度3-20" },
                        ]}
                    >
                        <Input
                            size="large"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="请输入用户名"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: "请输入密码" },
                            {
                                pattern: new RegExp(
                                    "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^0-9a-zA-Z]).{6,20}$",
                                    "g"
                                ),
                                message: "密码长度6-20，必须包含数字，大、小写字母和特殊字符",
                            },
                        ]}
                    >
                        <Input.Password
                            size="large"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="请输入密码"
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "请输入密码",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(new Error("密码不匹配"))
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            size="large"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="再次确认密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Link to="/login">已有账号？前往登录</Link>
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" type="primary" htmlType="submit" block>
                            立即注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Register
