import {FuseNavigationItem} from "../../lib/types/fuse-navigation";

export const MOCK_NAVIGATION_DATA: FuseNavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    icon: 'home',
    url: '/dashboard',
    isFeatureFound: true
  },
  {
    id: 'management',
    title: 'Management',
    type: 'collapsable',
    icon: 'briefcase',
    children: [
      {
        id: 'users',
        title: 'Users',
        type: 'item',
        icon: 'person',
        url: '/management/users',
        isFeatureFound: true
      },
      {
        id: 'roles',
        title: 'Roles',
        type: 'item',
        icon: 'archive',
        url: '/management/roles',
        isFeatureFound: true
      },
    ],
    isFeatureFound: true
  },
  {
    id: 'settings',
    title: 'Settings', // Translation key for title
    type: 'item',
    icon: 'settings',
    translate: 'SETTINGS', // Translation key for accessibility
    badge: {
      title: '3',
      bg: 'primary',
      fg: 'white',
    },
    url: '/settings',
    isFeatureFound: true
  },
  {
    id: 'documentation',
    title: 'Documentation',
    type: 'item',
    icon: 'book',
    externalUrl: true,
    openInNewTab: true,
    url: 'https://example.com/docs',
    isFeatureFound: true
  }
]
