import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((mod) => mod.HomePage),
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.page').then((mod) => mod.ContactPage),
  },
  {
    path: 'prendre-rendez-vous',
    loadComponent: () => import('./meet/meet.page').then((mod) => mod.MeetPage),
  },
  {
    path: 'etre-appele',
    loadComponent: () => import('./call/call.page').then((mod) => mod.CallPage),
  },
];
