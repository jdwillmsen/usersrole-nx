import { NavigationService } from './navigation.service';
import { Role } from '@usersrole-nx/shared';

describe('NavigationService', () => {
  let navigationService: NavigationService;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const permissionServiceMock: jest.Mocked<any> = {
    hasRole: jest.fn(),
  };

  beforeEach(() => {
    navigationService = new NavigationService(permissionServiceMock);
  });

  it('should be created', () => {
    expect(navigationService).toBeTruthy();
  });

  it('should return all roleless navigation items if no roles are provided', () => {
    const items = navigationService.getNavigationItems();
    expect(items.length).toBe(6);
  });

  it('should return all navigation items if all roles are provided', () => {
    const permissionServiceMockHasRole = jest.spyOn(
      permissionServiceMock,
      'hasRole',
    );
    permissionServiceMockHasRole.mockReturnValue(true);

    const itemsWithUserRole = navigationService.getNavigationItems();
    expect(itemsWithUserRole.length).toBe(9);
  });

  it('should return all navigation items but profile if admin role is provided', () => {
    const mockPermissionServiceHasRole = jest.spyOn(
      permissionServiceMock,
      'hasRole',
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockPermissionServiceHasRole.mockImplementation((roles: Role[]) =>
      roles.includes('admin'),
    );

    const itemsWithNoRolesMatch = navigationService.getNavigationItems();
    expect(itemsWithNoRolesMatch.length).toBe(8);
  });

  it('should return all navigation items but profile if manager role is provided', () => {
    const mockPermissionServiceHasRole = jest.spyOn(
      permissionServiceMock,
      'hasRole',
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockPermissionServiceHasRole.mockImplementation((roles: Role[]) =>
      roles.includes('manager'),
    );

    const itemsWithNoRolesMatch = navigationService.getNavigationItems();
    expect(itemsWithNoRolesMatch.length).toBe(8);
  });

  it('should return all navigation items but profile if read role is provided', () => {
    const mockPermissionServiceHasRole = jest.spyOn(
      permissionServiceMock,
      'hasRole',
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockPermissionServiceHasRole.mockImplementation((roles: Role[]) =>
      roles.includes('admin'),
    );

    const itemsWithNoRolesMatch = navigationService.getNavigationItems();
    expect(itemsWithNoRolesMatch.length).toBe(8);
  });

  it('should return all non admin navigation items if user role is provided', () => {
    const mockPermissionServiceHasRole = jest.spyOn(
      permissionServiceMock,
      'hasRole',
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockPermissionServiceHasRole.mockImplementation((roles: Role[]) =>
      roles.includes('user'),
    );

    const itemsWithNoRolesMatch = navigationService.getNavigationItems();
    expect(itemsWithNoRolesMatch.length).toBe(7);
  });
});
