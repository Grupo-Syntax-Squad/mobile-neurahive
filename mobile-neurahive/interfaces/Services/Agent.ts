export enum PostAgentRequestKeys {
    NAME = "name",
    GROUPS = "groups",
}

export interface PostAgentRequest {
    [PostAgentRequestKeys.NAME]: string
    [PostAgentRequestKeys.GROUPS]?: number[]
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
