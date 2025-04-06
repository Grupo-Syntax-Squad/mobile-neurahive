export type HomeActionButton = {
  id: string;
  title: string;
  icon: any;
  route: string;
  testID?: string;
  allowedRoles: number[]
};