export enum KnowledgeBaseKeys {
    ID = "id",
    NAME = "name",
}

export interface KnowledgeBase {
    [KnowledgeBaseKeys.ID]: number
    [KnowledgeBaseKeys.NAME]: string
}
