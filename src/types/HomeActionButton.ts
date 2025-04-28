export enum HomeActionButtonKeys {
    ID = "id",
    TITLE = "title",
    ICON = "icon",
    ROUTE = "route",
    TEST_ID = "testId",
    ALLOWED_ROLES = "allowedRoles",
}

export interface HomeActionButton {
    [HomeActionButtonKeys.ID]: string
    [HomeActionButtonKeys.TITLE]: string
    [HomeActionButtonKeys.ICON]: any
    [HomeActionButtonKeys.ROUTE]: string
    [HomeActionButtonKeys.TEST_ID]?: string
    [HomeActionButtonKeys.ALLOWED_ROLES]: number[]
}
