import { Component } from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  standalone: true,
  imports: [
    MatTable,
    MatIcon,
    MatMenu,
    MatMenuTrigger
  ],
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  displayedColumns: string[] = ['lastName', 'firstName', 'startTime', 'endTime', 'role'];
  employees = new MatTableDataSource([
    { lastName: 'Kovács', firstName: 'Péter', startTime: '8:00', endTime: '16:00', role: 'Raktáros' },
    { lastName: 'Szabó', firstName: 'Katalin', startTime: '8:00', endTime: '14:00', role: 'Raktáros' },
    { lastName: 'Nagy', firstName: 'Bence', startTime: '8:00', endTime: '16:00', role: 'Raktáros' },
    { lastName: 'Horváth', firstName: 'Péter', startTime: '8:00', endTime: '16:00', role: 'Admin' },
    { lastName: 'Farkas', firstName: 'Gábor', startTime: '8:00', endTime: '16:00', role: 'Raktáros' },
    { lastName: 'Tóth', firstName: 'Eszter', startTime: '16:00', endTime: '24:00', role: 'Admin' },
  ]);

  goBack() {
    console.log('Vissza a főoldalra');
  }

  editSchedule() {}

  addEmployee() {}
}
