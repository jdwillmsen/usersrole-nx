import { RolesService } from './roles.service';
import { EMPTY, throwError } from 'rxjs';
import { UpdateUserRolesRequest } from '@usersrole-nx/shared';
import { Environment } from '@usersrole-nx/core';

describe('RolesService', () => {
  let rolesService: RolesService;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const httpClientMock: jest.Mocked<any> = {
    patch: jest.fn(),
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const snackbarServiceMock: jest.Mocked<any> = {
    error: jest.fn(),
  };
  const environmentMock: Environment = {
    production: false,
    firebase: {},
    functionsBaseUrl: '',
  };
  const baseUrl = `${environmentMock.functionsBaseUrl}/users`;

  beforeEach(() => {
    rolesService = new RolesService(
      environmentMock,
      httpClientMock,
      snackbarServiceMock,
    );
  });

  it('should create an instance of RolesService', () => {
    expect(rolesService).toBeInstanceOf(RolesService);
  });

  it('should send a update request and return nothing on success', () => {
    const user: UpdateUserRolesRequest = {
      uid: 'uid1',
      roles: ['user'],
    };
    const url = `${baseUrl}/roles/${user.uid}`;
    jest.spyOn(httpClientMock, 'patch').mockReturnValue(EMPTY);

    rolesService.update(user).subscribe((result) => {
      expect(result).toBe(EMPTY);
      expect(httpClientMock.patch).toBeCalledTimes(1);
      expect(httpClientMock.patch).toHaveBeenCalledWith(url, user);
      expect(snackbarServiceMock.error).not.toHaveBeenCalled();
    });
  });

  it('should handle errors by showing a snackbar error message and returning nothing', () => {
    const user: UpdateUserRolesRequest = {
      uid: 'uid1',
      roles: ['user'],
    };
    const errorResponse = { error: 'User does not have proper permissions' };
    const url = `${baseUrl}/roles/${user.uid}`;
    jest
      .spyOn(httpClientMock, 'patch')
      .mockReturnValue(throwError(() => errorResponse));

    rolesService.update(user).subscribe((result) => {
      expect(result).toBe(EMPTY);
      expect(httpClientMock.patch).toBeCalledTimes(1);
      expect(httpClientMock.patch).toHaveBeenCalledWith(url, user);
      expect(snackbarServiceMock.error).toBeCalledTimes(1);
      expect(snackbarServiceMock.error).toHaveBeenCalledWith(
        errorResponse.error,
        { variant: 'filled' },
        true,
      );
    });
  });
});
