import {RouteInfo} from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'dashboard',
    icon: 'icon-Car-Wheel',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/dashboard/home',
    title: 'home',
    icon: 'icon-Home',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Menus',
    icon: 'icon-Bird',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/manage-question-sets',
    title: 'Manage Question Set',
    icon: 'icon-Files',
    class: '',
    extralink: false,
    submenu: []
  }
];
