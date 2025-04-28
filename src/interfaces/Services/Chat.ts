export enum PostChatRequestKeys {
    USER_ID = "user_id",
    AGENT_ID = "agent_id",
}

export interface PostChatRequest {
    [PostChatRequestKeys.USER_ID]: number
    [PostChatRequestKeys.AGENT_ID]: number
}

export enum GetChatResponseKeys {
    ID = "id",
    USER_ID = "user_id",
    AGENT_ID = "agent_id",
}

export interface GetChatResponse {
    [GetChatResponseKeys.ID]: number
    [GetChatResponseKeys.USER_ID]: number
    [GetChatResponseKeys.AGENT_ID]: number
}