import axios, { AxiosResponse } from "axios"
import { type } from "os"

const instance = axios.create({
    baseURL: "/api",
    timeout: 5000,
})

instance.interceptors.request.use(
    req => {
        const token = localStorage.getItem("cms-token")
        if (token) {
            req.headers = {
                "cms-token": token,
            }
        }
        return req
    },
    err => {
        return Promise.reject(err)
    }
)

instance.interceptors.response.use(
    res => {
        return res.data
    },
    err => {
        return Promise.reject(err)
    }
)

export type baseType<T> = {
    data: T
    errCode?: number
    message?: string
}

export type loginDataType = baseType<{
    avatar: string
    "cms-token": string
    editable: string
    player: string
    username: string
}>

export type editType = baseType<{
    subTitle: string
    title: string
    content: any
}>

export type articlesAxiosType = baseType<{
    total: number
    count: number
    num: number
    arr: {
        author: string
        date: string
        subTitle: string
        id: number
        title: string
    }[]
}>

export type userType = baseType<{
    avatar: string
    password: string
    username: string
}>

export default instance
