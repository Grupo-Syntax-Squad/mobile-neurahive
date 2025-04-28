export enum KnowledgeBaseKeys {
    ID = "id",
    NAME = "name",
}

export interface KnowledgeBase {
    [KnowledgeBaseKeys.ID]: number
    [KnowledgeBaseKeys.NAME]: string
}

export interface GetKnowledgeBaseDetails {
    [GetKnowledgeBaseDetailsKeys.ID]: number
    [GetKnowledgeBaseDetailsKeys.NAME]: string
    [GetKnowledgeBaseDetailsKeys.DATA]: KnowledgeBaseDetailsData
}

export enum GetKnowledgeBaseDetailsKeys {
    ID = "id",
    NAME = "name",
    DATA = "data",
}

export interface KnowledgeBaseDetailsData {
    [KnowledgeBaseDetailsDataKeys.QUESTIONS]: string[]
    [KnowledgeBaseDetailsDataKeys.ANSWERS]: string[]
}

export enum KnowledgeBaseDetailsDataKeys {
    QUESTIONS = "questions",
    ANSWERS = "answers",
}
