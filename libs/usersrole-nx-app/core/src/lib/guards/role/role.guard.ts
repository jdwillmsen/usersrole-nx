import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { PermissionService } from '../../services/permission/permission.service';

export const roleGuard: CanActivateFn = (next: ActivatedRouteSnapshot) => {
  return inject(PermissionService).canActivateRole(next);
};
