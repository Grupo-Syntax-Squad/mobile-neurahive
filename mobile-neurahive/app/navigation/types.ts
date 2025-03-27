export type RootStackParamList = {
    Home: undefined;
    Users: undefined; 
    Permissions: undefined;
    Agents: undefined;
  };
  
  // Substitua o NativeStackNavigationProp por:
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }