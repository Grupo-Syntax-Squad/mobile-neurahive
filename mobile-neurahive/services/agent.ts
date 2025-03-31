import { useAxios } from "@/hooks/useAxios"
import { GetAgentResponse, PostAgentRequest } from "@/interfaces/Services/Agent"

const { get, post, setLoading } = useAxios()

const prefix = "/agents"

export const postAgent = async (request: PostAgentRequest) => {
    try {
        setLoading(true)
        await post(`${prefix}/`, request)
    } catch (error) {
        throw error
    } finally {
        setLoading(false)
    }
}

export const getAgents = async (): Promise<GetAgentResponse[]> => {
    try {
        setLoading(true)
        const response = (await get(`${prefix}/`)).data
        return response.data
    } catch (error) {
        throw error
    } finally {
        setLoading(false)
    }
}
