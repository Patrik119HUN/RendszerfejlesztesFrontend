import { Routes } from '@angular/router';

//import {AdditemComponent} from "./additem/additem.component";

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'registercompany',
    loadComponent: () =>
      import('./auth/registercompany/registercompany.component').then(
        (m) => m.RegistercompanyComponent
      ),
  },
  {
    path: 'inventory/:id',
    loadComponent: () =>
      import('./inventory/inventory.component').then((m) => m.InventoryComponent),
  },
  {
    path: 'inventory',
    loadComponent: () =>
      import('./inventory/inventory.component').then((m) => m.InventoryComponent),
  },
  {
    path: 'transport',
    loadComponent: () =>
      import('./transport/transport.component').then((m) => m.TransportComponent),
  },
  // { path: 'additem', component: AdditemComponent },

  {
    path: 'statistics',
    loadComponent: () =>
      import('./statistics/statistics.component').then((m) => m.StatisticsComponent),
  },
  {
    path: 'schedule',
    loadComponent: () => import('./schedule/schedule.component').then((m) => m.ScheduleComponent),
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then((m) => m.SettingsComponent),
  },
  //{ path: 'logout', component: LogoutComponent },
  {
    path: 'warehouse',
    loadComponent: () =>
      import('./warehouse/warehouse.component').then((m) => m.WarehouseComponent),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
