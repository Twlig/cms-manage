import { Form, Input, Button, message, Upload } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useEffect, useState } from "react"
import type { UploadChangeParam } from "antd/es/upload"
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { connect } from "react-redux"

import axios, { userType } from "@/utils/axios"
import "./less/means.less"
import { addKey } from "@/store/action"

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener("load", () => callback(reader.result as string))
    reader.readAsDataURL(img)
}

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
    if (!isJpgOrPng) {
        message.error("只能上传JPG或PNG文件!")
    }
    const isLt2M = file.size / 1024 / 1024 / 1024 < 200
    if (!isLt2M) {
        message.error("图片需要小于200KB!")
    }
    return isJpgOrPng && isLt2M
}

const Means = (props: any) => {
    const [form] = useForm()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState<string>()

    //上传头像
    const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === "uploading") {
            setLoading(true)
            return
        }
        if (info.file.status === "done") {
            getBase64(info.file.originFileObj as RcFile, url => {
                setLoading(false)
                setImageUrl(url)
                localStorage.setItem("avatar", info.file.response.data.filePath)
                props.addKey()
            })
        }
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )
    //修改用户名和密码
    const submit = () => {
        const { username, password } = form.getFieldsValue()
        console.log(username, password)
        axios.put("/info", { username, password }).then((res: userType) => {
            if (res.errCode !== 0) {
                message.error(res.message)
            } else {
                message.success(res.message)
                localStorage.clear()
                navigate("/login")
            }
        })
    }
    //获取信息
    useEffect(() => {
        axios.get("/info").then((res: userType) => {
            if (res.errCode !== 0) {
                message.error(res.message)
            } else {
                const { username, password } = res.data
                form.setFieldsValue({ username, password })
            }
        })
    }, [])
    return (
        <div className="means">
            <Form
                form={form}
                name="basic"
                style={{ width: "400px" }}
                autoComplete="off"
                labelAlign="right"
                labelCol={{ span: 6 }}
                onFinish={submit}
            >
                <Form.Item
                    label="修改用户名："
                    name="username"
                    rules={[
                        { required: true, message: "请输入用户名" },
                        { pattern: new RegExp("^.{3,20}$", "g"), message: "用户名长度3-20" },
                    ]}
                >
                    <Input placeholder="请输入新用户名" />
                </Form.Item>

                <Form.Item
                    label="修改密码："
                    name="password"
                    rules={[
                        { required: true, message: "请输入密码" },
                        {
                            pattern: new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^0-9a-zA-Z]).{6,20}$", "g"),
                            message: "密码长度6-20，必须包含数字，大、小写字母和特殊字符",
                        },
                    ]}
                >
                    <Input.Password placeholder="请输入新密码" />
                </Form.Item>
                <p>* 注意：该修改页面由于后端的原因，导致无法正常修改用户名和密码</p>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ float: "right" }}>
                        提交
                    </Button>
                </Form.Item>
            </Form>
            <p>上传头像:</p>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/api/upload"
                headers={{ "cms-token": localStorage.getItem("cms-token")! }}
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: "100%" }} /> : uploadButton}
            </Upload>
        </div>
    )
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addKey: () => {
            dispatch(addKey())
        },
    }
}
export default connect(null, mapDispatchToProps)(Means)
