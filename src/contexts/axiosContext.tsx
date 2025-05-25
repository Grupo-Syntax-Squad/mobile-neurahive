import React, { createContext, useContext, ReactNode } from "react"
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
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

    client.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            if (error.response) {
                console.warn("Erro da API:", error.response.data)
            } else if (error.request) {
                // Sem resposta
                console.warn("Sem resposta do servidor:", error.message)
            } else {
                // Outro tipo de erro
                console.warn("Erro desconhecido:", error.message)
            }

            return Promise.reject(formatAxiosError(error))
        }
    )

    const formatAxiosError = (error: AxiosError): string => {
        if (error.response?.data) {
            const data = error.response.data as any
            return data.message || JSON.stringify(data)
        }
        if (error.message) return error.message
        return "Erro desconhecido."
    }

    const get = async (url: string, config: AxiosRequestConfig = {}) => {
        const mergedConfig: AxiosRequestConfig = {
            ...config,
            headers: {
                ...client.defaults.headers.common,
                ...config.headers,
            },
        }
        const response = await client.get(url, mergedConfig)
        return response.data
    }

    const post = (url: string, body: any, config: AxiosRequestConfig = {}) => {
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

    const deletar = (url: string, config: AxiosRequestConfig = {}) => {
        const mergedConfig: AxiosRequestConfig = {
            ...config,
            headers: {
                ...client.defaults.headers.common,
                ...config.headers,
            },
        }
        return client.delete(url, mergedConfig)
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
