import axios, { AxiosResponse } from "axios"
import { type } from "os"

const instance = axios.create({
    baseURL: "/api",
    timeout: 5000,
})

instance.interceptors.request.use(
    req => {
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

export type loginDataType = {
    data: {
        avatar: string
        "cms-token": string
        editable: string
        player: string
        username: string
    }
    errCode?: number
    message?: string
}

export interface articleType {
    author: string
    date: string
    subTitle: string
    id: number
    title: string
}

export interface articlesDataType {
    total: number
    count: number
    num: number
    arr: articleType[]
}

export interface articlesAxiosType {
    data: articlesDataType
    errCode?: number
    message?: string
}

export default instance
