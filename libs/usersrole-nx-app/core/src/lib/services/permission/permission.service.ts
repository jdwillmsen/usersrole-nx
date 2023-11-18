import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { Role } from '@usersrole-nx/shared';
import { UsersService } from '../users/users.service';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  roles: Role[] = [];

  constructor(
    private router: Router,
    private usersService: UsersService,
    private angularFireAuth: AngularFireAuth,
    private snackbarService: SnackbarService,
  ) {
    this.getRole();
  }

  canActivateRole(next: ActivatedRouteSnapshot) {
    return this.angularFireAuth.user.pipe(
      switchMap((user) => {
        if (!user) {
          return of(false);
        }
        return this.usersService.user$(user.uid).pipe(
          map((userDetails) => {
            const hasRequiredRole = next.data['roles'].some((role: Role) =>
              userDetails.roles.includes(role),
            );
            if (!hasRequiredRole) {
              this.router.navigate(['/forbidden']);
            }
            return hasRequiredRole;
          }),
        );
      }),
    );
  }

  hasRole(roles: Role[]): boolean {
    return roles.some((role: Role) => this.roles.includes(role));
  }

  getRole() {
    this.angularFireAuth.user.subscribe({
      next: (user) => {
        if (user !== null) {
          this.usersService.user$(user.uid).subscribe((user) => {
            this.roles = user.roles;
          });
        }
      },
      error: (error) => {
        this.snackbarService.error(error.message, { variant: 'filled' }, true);
      },
    });
  }
}
