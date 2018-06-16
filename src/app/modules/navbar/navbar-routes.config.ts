import { MenuType, RouteInfo } from './navbar.metadata';

export const ROUTES: RouteInfo[] = [
  { path: '', title: 'Angular2 Navbar', menuType: MenuType.BRAND },
  { path: '', title: 'Home', menuType: MenuType.LEFT },
  { path: 'competitions', title: 'Competitions', menuType: MenuType.RIGHT },
  { path: 'profile', title: 'Profile', menuType: MenuType.RIGHT }
];
