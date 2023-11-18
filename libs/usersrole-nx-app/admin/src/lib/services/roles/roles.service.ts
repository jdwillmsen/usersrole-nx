import { Inject, Injectable } from '@angular/core';
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
  private baseUrl = `${this.environment.functionsBaseUrl}/users`;

  constructor(
    @Inject(ENVIRONMENT) private environment: Environment,
    private http: HttpClient,
    private snackbarService: SnackbarService,
  ) {}

  update(user: UpdateUserRolesRequest) {
    return this.http
      .patch(`${this.baseUrl}/roles/${user.uid}`, user)
      .pipe(catchError((error) => handleError(error, this.snackbarService)));
  }
}
