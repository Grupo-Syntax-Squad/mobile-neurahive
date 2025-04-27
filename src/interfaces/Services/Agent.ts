export enum PostAgentRequestKeys {
    NAME = "name",
    THEME = "theme",
    BEHAVIOR = "behavior",
    GROUPS = "groups",
    KNOWLEDGE_BASE_ID = "knowledge_base_id"
}

export interface PostAgentRequest {
    [PostAgentRequestKeys.NAME]: string
    [PostAgentRequestKeys.GROUPS]?: number[]
    [PostAgentRequestKeys.THEME]: string
    [PostAgentRequestKeys.BEHAVIOR]?: string
    [PostAgentRequestKeys.KNOWLEDGE_BASE_ID]?: number
}

export enum GetAgentResponseKeys {
    ID = "id",
    NAME = "name",
    GROUPS = "groups",
}

export interface GetAgentResponse {
    [GetAgentResponseKeys.ID]: number
    [GetAgentResponseKeys.NAME]: string
    [GetAgentResponseKeys.GROUPS]: number[]
}
