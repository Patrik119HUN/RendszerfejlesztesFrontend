import { Component, OnInit } from '@angular/core';
import { ScheduleService } from './service/schedule.service';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from "@angular/forms";
import { MatIconModule } from '@angular/material/icon';
import { Observable } from "rxjs";
import { IEmployee } from "../shared/model/employee";
import { AsyncPipe } from '@angular/common';
import {MatDialog} from "@angular/material/dialog";
import {AddEmployeeDialogComponent} from "./dialog/add-employee-dialog.component";


@Component({
  selector: 'app-schedule',
  standalone: true,
  templateUrl: './schedule.component.html',
  imports: [
    FormsModule,
    MatMenuModule,
    MatIconModule,
    AsyncPipe
  ],
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  public displayedColumns: string[] = ['lastName', 'firstName', 'startTime', 'endTime', 'role'];
  public employees$: Observable<IEmployee[]>;
  public newEmployee: Partial<IEmployee> = { lastName: '', firstName: '', role: [] };

  public constructor(private scheduleService: ScheduleService,
                     private readonly dialog: MatDialog,
                     private readonly employeeService: ScheduleService,
  ) {}

  public ngOnInit(): void {
    this.loadSchedules();
  }

  public loadSchedules(): void {
    this.employees$ = this.scheduleService.getSchedules();
  }

  public cancelAdd(): void {
    this.newEmployee = { lastName: '', firstName: '', role: [] };
  }

  public addEmployee(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      data: { employee: null, isNew: true },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((newEmployee) => {
      if (newEmployee) {
        const employeeRequest = {
          firstName: newEmployee.firstName,
          lastName: newEmployee.lastName,
          email: newEmployee.email,
          role: newEmployee.role,
        } as IEmployee;

        this.employeeService.addSchedule(employeeRequest).subscribe();
      }
    });
  }


  public editEmployee(employee: IEmployee): void {
    this.newEmployee = { ...employee };
  }

  public deleteEmployee(employee: IEmployee): void {
    if (confirm(`Biztosan törölni szeretné ${employee.firstName} ${employee.lastName} nevű alkalmazottat?`)) {
      this.scheduleService.deleteSchedule(employee.id).subscribe({
        next: () => {
          this.loadSchedules(); // Adatok frissítése törlés után
          console.log(`${employee.firstName} ${employee.lastName} törölve.`);
        },
        error: (err) => console.error('Hiba történt a törlés során:', err)
      });
    }
  }
}
