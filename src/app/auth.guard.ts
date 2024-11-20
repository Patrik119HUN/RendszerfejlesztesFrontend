import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  return authService.isLoggedIn();
};
