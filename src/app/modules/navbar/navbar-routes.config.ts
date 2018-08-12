import { MenuType, RouteInfo } from './navbar.metadata';

export const ROUTES: RouteInfo[] = [
  { path: '', title: 'Home', menuType: MenuType.BRAND },
  { path: 'competitions', title: 'Competitions', menuType: MenuType.LEFT },
  { path: 'profile', title: 'Profile', menuType: MenuType.LEFT }
];
