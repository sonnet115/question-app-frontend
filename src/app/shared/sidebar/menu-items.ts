import {RouteInfo} from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Fore Knight',
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
  },
  {
    path: '/create-questions',
    title: 'Create Question',
    icon: 'icon-Files',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Sentence Game',
    icon: 'icon-Bird',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/manage-sentence',
    title: 'Manage Sentence',
    icon: 'icon-Files',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Sink & Swim',
    icon: 'icon-Bird',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/manage-sink-swim',
    title: 'Manage Objects',
    icon: 'icon-Files',
    class: '',
    extralink: false,
    submenu: []
  }
];
