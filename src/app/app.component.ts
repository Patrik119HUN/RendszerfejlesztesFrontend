import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatListItem, MatListModule } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatListItem, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = 'frontend';

  @Input() public currentPage: string = '';
  @Input() public loggedInUser = null;
  @Output() public selectedPage: EventEmitter<string> = new EventEmitter();
  @Output() public onCloseSidenav: EventEmitter<boolean> = new EventEmitter();
  @Output() public onLogout: EventEmitter<boolean> = new EventEmitter();

  public constructor(private readonly authService: AuthService, private readonly router: Router) {}

  public close(logout?: boolean): void {
    this.onCloseSidenav.emit(true);
    if (logout === true) {
      this.onLogout.emit(logout);
    }
  }

  public logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Failed to logout');
      },
    });
  }
}
