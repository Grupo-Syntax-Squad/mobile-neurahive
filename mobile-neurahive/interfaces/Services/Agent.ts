export enum PostAgentRequestKeys {
    NAME = "name",
}

export interface PostAgentRequest {
    [PostAgentRequestKeys.NAME]: string
}

export enum GetAgentResponseKeys {
    ID = "id",
    NAME = "name",
}

export interface GetAgentResponse {
    [GetAgentResponseKeys.ID]: number
    [GetAgentResponseKeys.NAME]: string
}
