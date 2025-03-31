import axios, { AxiosRequestConfig } from "axios"
import { useAuth } from "../context/authContext"
import { useState } from "react"

export const useAxios = () => {
    const { token } = useAuth()
    const [loading, setLoading] = useState(true)

    const client = axios.create({
        baseURL: `${process.env.EXPO_PUBLIC_API_URL}`,
        headers: { Authorization: `Bearer ${token}` },
    })

    const get = (url: string, config?: AxiosRequestConfig<any> | undefined) => {
        return client.get(url, config)
    }
    const post = (
        url: string,
        body: any,
        config?: AxiosRequestConfig<any> | undefined
    ) => {
        return client.post(url, body, config)
    }
    const put = (
        url: string,
        body: any,
        config?: AxiosRequestConfig<any> | undefined
    ) => {
        return client.put(url, body, config)
    }
    const deletar = (
        url: string,
        config?: AxiosRequestConfig<any> | undefined
    ) => {
        return client.delete(url)
    }

    return { get, post, loading, setLoading, put, deletar }
}
