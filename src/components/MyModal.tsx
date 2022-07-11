import { Button, Modal, Form, Input, message } from "antd"
import { useForm, FormInstance } from "antd/lib/form/Form"
import { forwardRef, useEffect, useImperativeHandle, useState, ForwardedRef } from "react"

export type formFields = { title: string | undefined; subTitle: string | undefined }

export type refType = {
    getFieldsValue: formFields
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    setFieldsValue: (values: formFields) => void
}

// const initialValues: formFields = {
//     title: undefined,
//     subTitle: undefined,
// }

const MyModal = (props: any, ref: ForwardedRef<refType>) => {
    useImperativeHandle(ref, () => ({
        setVisible,
        getFieldsValue: form.getFieldsValue(),
        setFieldsValue: form.setFieldsValue,
    }))
    const [visible, setVisible] = useState(false)
    const [form] = useForm()
    const handleOK = () => {
        form.validateFields()
            .then((values: formFields) => {
                form.setFieldsValue(values)
                setVisible(false)
            })
            .catch(() => {
                return
            })
    }
    const handleCancel = () => {
        setVisible(false)
        // setFormValues(initialValues)
    }
    return (
        <Modal
            visible={visible}
            title="文章标题"
            onCancel={handleCancel}
            zIndex={99999}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    取消
                </Button>,
                <Button key="submit" type="primary" onClick={handleOK}>
                    确定
                </Button>,
            ]}
        >
            <Form form={form} name="basic" autoComplete="off" labelCol={{ span: 4 }} labelAlign="left">
                <Form.Item label="标题" name="title" rules={[{ required: true, message: "请输入文章标题" }]}>
                    <Input placeholder="请输入文章标题" />
                </Form.Item>

                <Form.Item label="副标题" name="subTitle" rules={[{ required: true, message: "请输入文章副标题" }]}>
                    <Input placeholder="请输入文章副标题" />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default forwardRef(MyModal)
