import { AxiosError } from "axios"

export const getErrorMessage = (error: unknown): string => {
    if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as AxiosError<{ detail?: string }>
        return axiosError.response?.data?.detail || "Erro desconhecido do servidor"
    }
    return "Erro inesperado"
}
