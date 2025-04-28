export type RootStackParamList = {
    Home: undefined
    Users: undefined
    Permissions: undefined
    Agents: undefined
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
