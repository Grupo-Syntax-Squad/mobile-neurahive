export enum DashboardButtonKeys {
    ID = "id",
    TITLE = "title",
    TOTAL = "total",
    ROUTE = "route",
    TEST_ID = "testId",
    ALLOWED_ROLES = "allowedRoles",
}

export interface DashboardButton {
    [DashboardButtonKeys.ID]: string
    [DashboardButtonKeys.TITLE]: string
    [DashboardButtonKeys.TOTAL]: number
    [DashboardButtonKeys.ROUTE]: string
    [DashboardButtonKeys.TEST_ID]?: string
    [DashboardButtonKeys.ALLOWED_ROLES]: number[]
}
