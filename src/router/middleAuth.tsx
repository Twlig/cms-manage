import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { message } from "antd"

export const CheckLogin = ({ children }: any) => {
    const navigate = useNavigate()
    const params = useParams()
    const [userInfo, setUserInfo] = useState("")

    const getUserInfo = () => {
        const userInfo = localStorage.getItem("cms-token")

        if (userInfo) {
            setUserInfo(userInfo)
        } else {
            message.info("未登录，正在为您跳转到登录页...", 1)
            setTimeout(() => {
                navigate("/login")
            }, 1500)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [userInfo])

    if (!userInfo) {
        return null
    }
    return children
}
