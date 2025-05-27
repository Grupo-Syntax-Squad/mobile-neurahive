export enum AgentKeys {
    ID = "id",
    NAME = "name",
    THEME = "theme",
    BEHAVIOR = "behavior",
    TEMPERATURE = "temperature",
    TOP_P = "top_p",
    IMAGE_ID = "image_id",
    GROUPS = "groups",
    KNOWLEDGE_BASE_ID = "knowledge_base_id",
    ENABLED = "enabled",
}

export interface Agent {
    [AgentKeys.ID]: number
    [AgentKeys.NAME]: string
    [AgentKeys.THEME]: string
    [AgentKeys.BEHAVIOR]: string
    [AgentKeys.TEMPERATURE]: number
    [AgentKeys.TOP_P]: number
    [AgentKeys.IMAGE_ID]?: number
    [AgentKeys.GROUPS]: number[]
    [AgentKeys.KNOWLEDGE_BASE_ID]: number
    [AgentKeys.ENABLED]: boolean
}

export enum PutAgentKeys {
    NAME = "name",
    THEME = "theme",
    BEHAVIOR = "behavior",
    TEMPERATURE = "temperature",
    TOP_P = "top_p",
    IMAGE_ID = "image_id",
    GROUPS = "groups",
    KNOWLEDGE_BASE_ID = "knowledge_base_id",
    ENABLED = "enabled",
}

export interface PutAgentRequest {
    [AgentKeys.NAME]: string
    [AgentKeys.THEME]: string
    [AgentKeys.BEHAVIOR]: string
    [AgentKeys.TEMPERATURE]: number
    [AgentKeys.TOP_P]: number
    [AgentKeys.IMAGE_ID]?: number
    [AgentKeys.GROUPS]: number[]
    [AgentKeys.KNOWLEDGE_BASE_ID]: number
    [AgentKeys.ENABLED]: boolean
}
