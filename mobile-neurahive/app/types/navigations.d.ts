// types/navigation.d.ts
import { RootStackParamList } from "../navigation/types"

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
