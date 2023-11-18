import { TestBed } from '@angular/core/testing';
import { provideRouter, Route, Router } from '@angular/router';

import { roleGuard } from './role.guard';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  RouterTestingHarness,
  RouterTestingModule,
} from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PermissionService } from '../../services/permission/permission.service';
import { UsersService } from '../../services/users/users.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'usersrole-nx-test-admin',
  standalone: true,
  template: '',
})
class TestAdminComponent {}

@Component({
  selector: 'usersrole-nx-test-user',
  standalone: true,
  template: '',
})
class TestUserComponent {}

@Component({
  selector: 'usersrole-nx-test-sign-in',
  standalone: true,
  template: '',
})
class TestSignInComponent {}

describe('roleGuard', () => {
  const routes: Route[] = [
    {
      path: 'test/admin',
      canActivate: [roleGuard],
      component: TestAdminComponent,
      data: {
        roles: ['read', 'manager', 'admin'],
      },
    },
    {
      path: 'test/user',
      canActivate: [roleGuard],
      component: TestUserComponent,
      data: {
        roles: ['read', 'user'],
      },
    },
    {
      path: 'test/sign-in',
      component: TestSignInComponent,
    },
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const angularFireAuthMock: jest.Mocked<any> = {
    user: of(null),
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const usersServiceMock: jest.Mocked<any> = {
    users$: jest.fn(),
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const snackBarServiceMock: jest.Mocked<any> = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const permissionServiceMock: jest.Mocked<any> = {
    canActivateRole: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        TestAdminComponent,
        TestUserComponent,
        TestSignInComponent,
      ],
      providers: [
        provideRouter(routes),
        {
          provide: AngularFireAuth,
          useValue: angularFireAuthMock,
        },
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
        {
          provide: MatSnackBar,
          useValue: null,
        },
        {
          provide: SnackbarService,
          useValue: snackBarServiceMock,
        },
        {
          provide: PermissionService,
          useValue: permissionServiceMock,
        },
        RouterTestingModule,
      ],
    });
  });

  it('should route if the route has no role requirement', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/test/sign-in');

    expect(TestBed.inject(Router).url).toEqual('/test/sign-in');
  });

  it('should route if the user does have the necessary roles', async () => {
    permissionServiceMock.canActivateRole.mockReturnValue(of(true));

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/test/user');

    expect(TestBed.inject(Router).url).toEqual('/test/user');
  });

  it('should not route if user lack the necessary roles', async () => {
    const harness = await RouterTestingHarness.create();
    permissionServiceMock.canActivateRole.mockReturnValue(of(false));

    await harness.navigateByUrl('/test/admin');

    // should not allow route to pass through hence will be on default
    expect(TestBed.inject(Router).url).toEqual('/');
  });
});
