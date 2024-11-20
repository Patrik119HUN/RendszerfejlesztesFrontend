import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { InventoryComponent } from './inventory/inventory.component';
import { SettingsComponent } from './settings/settings.component';
import { TransportComponent } from './transport/transport.component';
import { RegisterComponent } from './auth/register/register.component';
//import {AdditemComponent} from "./additem/additem.component";
import { WarehouseComponent } from "./warehouse/warehouse.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {ScheduleComponent} from "./schedule/schedule.component";
import { RegistercompanyComponent } from './auth/registercompany/registercompany.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registercompany', component: RegistercompanyComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'transport', component: TransportComponent },
 // { path: 'additem', component: AdditemComponent },

  { path: 'statistics', component: StatisticsComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'settings', component: SettingsComponent },
  //{ path: 'logout', component: LogoutComponent },
  { path: 'warehouse', component: WarehouseComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
