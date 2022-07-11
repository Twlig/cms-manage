import { PageHeader, Button, Modal, Form, Input, message } from "antd"
import moment from "moment"
import { useEffect, useRef, useState, createRef } from "react"
import E from "wangeditor"
import MyModal, { refType } from "@/components/MyModal"
import axios, { editType } from "@/utils/axios"
import { useNavigate, useParams } from "react-router-dom"

let editor: E

export default function () {
    const [content, setContent] = useState("")
    const navigate = useNavigate()
    const params = useParams()
    const ref = createRef<refType>()
    const showModal = () => {
        ref.current!.setVisible(true)
    }
    const submitArticle = () => {
        const { title, subTitle } = ref.current!.getFieldsValue
        if (params.id) {
            axios
                .put("/article/update", {
                    //这边后端接口有缺陷，如果没有传title或subTitle应该默认使用原值，而不是报错。
                    //前端也有一点缺陷。如果只编辑内容，没有打开modal，就提交。由于没有打开modal导致form没有实例化，虽然设置了form的值,但无法通过getFieldsValue获取到对应的值
                    title,
                    subTitle,
                    content,
                    id: params.id,
                })
                .then((res: editType) => {
                    if (res.errCode !== 0) {
                        message.error(res.message)
                    } else {
                        message.success(res.message)
                        navigate("/listtable")
                    }
                })
        } else {
            axios
                .post("/article/add", {
                    title,
                    subTitle,
                    content,
                })
                .then((res: editType) => {
                    if (res.errCode !== 0) {
                        message.error(res.message)
                    } else {
                        message.success(res.message)
                        navigate("/listtable")
                    }
                })
        }
    }
    useEffect(() => {
        editor = new E("#editContent")
        editor.config.onchange = (newHtml: any) => {
            setContent(newHtml)
        }
        editor.create()
        return () => {
            editor.destroy()
        }
    }, [])
    useEffect(() => {
        if (params.id) {
            axios.get(`/article/${params.id}`).then((res: editType) => {
                if (res.errCode !== 0) {
                    message.error(res.message)
                } else {
                    const { title, subTitle, content } = res.data
                    ref.current!.setFieldsValue({ title, subTitle })
                    editor.txt.html(content) //重新设置编辑器内容
                    message.success(res.message)
                }
            })
        }
    }, [params.id])
    return (
        <>
            <PageHeader
                className="site-page-header"
                onBack={params.id ? () => window.history.back() : undefined}
                title="文章编辑"
                subTitle={"当前日期:" + moment(Date.now()).format("YYYY-MM-DD HH:MM:SS")}
                extra={[
                    <Button key="1" type="primary" onClick={showModal}>
                        编辑标题
                    </Button>,
                    <Button key="2" type="primary" onClick={submitArticle}>
                        提交文章
                    </Button>,
                ]}
            ></PageHeader>
            <div id="editContent" style={{ padding: "0 20px 20px" }}></div>
            <MyModal ref={ref} />
        </>
    )
}
