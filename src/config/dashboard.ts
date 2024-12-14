import {
  Music2,
  ListMusic,
  Mic2,
  Library,
  Settings,
  Home,
  FileMusic,
  Users,
  Headphones,
} from 'lucide-react';

export const dashboardTools = [
  {
    title: 'Song Library',
    description: 'Access and manage your entire music collection in one place.',
    icon: Music2,
    path: '/songs',
  },
  {
    title: 'Setlists',
    description: 'Create and organize setlists for your performances.',
    icon: ListMusic,
    path: '/setlists',
  },
  {
    title: 'Band Manager',
    description: 'Coordinate with your band members and manage schedules.',
    icon: Users,
    path: '/band',
  },
  {
    title: 'Practice Tools',
    description: 'Access metronome, tuner, and other practice utilities.',
    icon: Headphones,
    path: '/practice',
  },
  {
    title: 'Recordings',
    description: 'Store and organize your rehearsal recordings.',
    icon: Mic2,
    path: '/recordings',
  },
  {
    title: 'Sheet Music',
    description: 'View and manage your digital sheet music collection.',
    icon: FileMusic,
    path: '/sheets',
  },
];

export const dashboardNavItems = [
  {
    title: 'Dashboard',
    icon: Home,
    path: '/dashboard',
  },
  {
    title: 'My Music',
    icon: Library,
    path: '/songs',
  },
  {
    title: 'Band',
    icon: Users,
    path: '/band',
  },
  {
    title: 'Settings',
    icon: Settings,
    path: '/settings',
  },
];