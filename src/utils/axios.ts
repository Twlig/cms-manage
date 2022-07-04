import axios, { AxiosResponse } from "axios"

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

export default instance
