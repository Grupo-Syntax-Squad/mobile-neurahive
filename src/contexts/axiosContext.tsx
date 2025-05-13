import React, { createContext, useContext, ReactNode } from "react"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { useAuth } from "./authContext"

interface Props {
    get: (url: string, config?: AxiosRequestConfig<any> | undefined) => Promise<any>
    post: (
        url: string,
        body: any,
        config?: AxiosRequestConfig<any> | undefined
    ) => Promise<AxiosResponse<any, any>>
    put: (
        url: string,
        body: any,
        config?: AxiosRequestConfig<any> | undefined
    ) => Promise<AxiosResponse<any, any>>
    deletar: (
        url: string,
        config?: AxiosRequestConfig<any> | undefined
    ) => Promise<AxiosResponse<any, any>>
}

const AxiosContext = createContext<Props | undefined>(undefined)

export const AxiosProvider = ({ children }: { children: ReactNode }) => {
    const { token } = useAuth()
    const client = axios.create({
        baseURL: `${process.env.EXPO_PUBLIC_API_URL}`,
        headers: { Authorization: `Bearer ${token}` },
    })

    const get = async (url: string, config?: AxiosRequestConfig<any> | undefined) => {
        return (await client.get(url, config)).data
    }

    const post = (
        url: string,
        body: any,
        config: AxiosRequestConfig = {}
    ) => {
        const mergedConfig: AxiosRequestConfig = {
            ...config,
            headers: {
                ...client.defaults.headers.common,
                ...config.headers,
            },
        }

        return client.post(url, body, mergedConfig)
    }

    const put = (url: string, body: any, config: AxiosRequestConfig = {}) => {
        const mergedConfig: AxiosRequestConfig = {
            ...config,
            headers: {
                ...client.defaults.headers.common,
                ...config.headers,
            },
        }
        return client.put(url, body, mergedConfig)
    }

    const deletar = (url: string, config?: AxiosRequestConfig<any> | undefined) => {
        return client.delete(url)
    }

    return (
        <AxiosContext.Provider
            value={{
                get,
                post,
                put,
                deletar,
            }}
        >
            {children}
        </AxiosContext.Provider>
    )
}

export const useAxios = () => {
    const context = useContext(AxiosContext)
    if (!context) throw new Error("useAxios can only be used inside of AxiosProvider")
    return context
}
