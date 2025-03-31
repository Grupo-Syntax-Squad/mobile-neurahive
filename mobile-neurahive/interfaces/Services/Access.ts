export enum AccessKeys {
    ID = "id",
    NAME = "name",
}

export interface Access {
    [AccessKeys.ID]: number
    [AccessKeys.NAME]: string
}
