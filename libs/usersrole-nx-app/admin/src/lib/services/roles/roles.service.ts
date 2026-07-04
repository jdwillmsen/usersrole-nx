import { Injectable, inject } from '@angular/core';
import {
  Environment,
  ENVIRONMENT,
  handleError,
  SnackbarService,
} from '@usersrole-nx/core';
import { catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UpdateUserRolesRequest } from '@usersrole-nx/shared';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private environment = inject<Environment>(ENVIRONMENT);
  private http = inject(HttpClient);
  private snackbarService = inject(SnackbarService);

  private baseUrl = `${this.environment.functionsBaseUrl}/users`;

  update(user: UpdateUserRolesRequest) {
    return this.http
      .patch(`${this.baseUrl}/roles/${user.uid}`, user)
      .pipe(catchError((error) => handleError(error, this.snackbarService)));
  }
}
