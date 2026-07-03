import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { of } from 'rxjs';
import { SnackbarService } from '../snackbar/snackbar.service';
import { AUTH } from '../../firebase.tokens';
import * as firebaseAuth from 'firebase/auth';
import {
  AuthCredential,
  GithubAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth';
import * as rxfireAuth from 'rxfire/auth';
import * as errorHandlerModule from '../error-handler/error-handler.service';

jest.mock('firebase/auth', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/auth'),
  signInWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  signOut: jest.fn(),
  fetchSignInMethodsForEmail: jest.fn(),
  linkWithCredential: jest.fn(),
}));

describe('AuthenticationService', () => {
  let authService: AuthenticationService;
  const authMock = {} as firebaseAuth.Auth;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const routerMock: jest.Mocked<any> = {
    navigate: jest.fn(() => Promise.resolve(true)),
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const snackbarServiceMock: jest.Mocked<any> = {
    success: jest.fn(),
    error: jest.fn(),
  };
  const authProviderMock = new GoogleAuthProvider();
  const defaultEmail = 'testUser@usersrole.com';
  const defaultPassword = 'testPassword';
  const defaultErrorMessage = 'An error has occurred';
  const defaultLogoutSuccessMessage = 'Sign out successful';
  const invalidSignInMessage = 'Invalid email or password';

  const signInWithEmailAndPasswordSpy =
    firebaseAuth.signInWithEmailAndPassword as jest.Mock;
  const signInWithPopupSpy = firebaseAuth.signInWithPopup as jest.Mock;
  const signOutSpy = firebaseAuth.signOut as jest.Mock;
  const fetchSignInMethodsForEmailSpy =
    firebaseAuth.fetchSignInMethodsForEmail as jest.Mock;
  const linkWithCredentialSpy = firebaseAuth.linkWithCredential as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(rxfireAuth, 'authState').mockReturnValue(of(null) as any);
    routerMock.navigate.mockImplementation(() => Promise.resolve(true));
    linkWithCredentialSpy.mockResolvedValue({});

    TestBed.configureTestingModule({
      providers: [
        { provide: AUTH, useValue: authMock },
        { provide: Router, useValue: routerMock },
        { provide: SnackbarService, useValue: snackbarServiceMock },
      ],
    });
    authService = TestBed.inject(AuthenticationService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create an instance of AuthService', () => {
    expect(authService).toBeInstanceOf(AuthenticationService);
  });

  it('should have an initial user$ observable with null user', (done) => {
    authService.user$.subscribe((user) => {
      expect(user).toBeNull();
      done();
    });
  });

  it('should call emailAuth and navigate to home on success', (done) => {
    signInWithEmailAndPasswordSpy.mockResolvedValueOnce({});

    authService.emailAuth(defaultEmail, defaultPassword).subscribe(() => {
      expect(signInWithEmailAndPasswordSpy).toHaveBeenCalledWith(
        authMock,
        defaultEmail,
        defaultPassword,
      );
      expect(routerMock.navigate).toHaveBeenCalledWith(['home']);
      expect(snackbarServiceMock.success).toHaveBeenCalled();
      done();
    });
  });

  it('should call emailAuth and show error snackbar on failure', (done) => {
    signInWithEmailAndPasswordSpy.mockRejectedValueOnce({
      message: defaultErrorMessage,
    });

    authService.emailAuth(defaultEmail, defaultPassword).subscribe(() => {
      expect(signInWithEmailAndPasswordSpy).toHaveBeenCalledWith(
        authMock,
        defaultEmail,
        defaultPassword,
      );
      expect(snackbarServiceMock.error).toHaveBeenCalledWith(
        defaultErrorMessage,
        { variant: 'filled' },
        true,
      );
      done();
    });
  });

  it('should call emailAuth and show error message with incorrect email', (done) => {
    signInWithEmailAndPasswordSpy.mockRejectedValueOnce({
      code: 'auth/user-not-found',
    });

    authService.emailAuth(defaultEmail, defaultPassword).subscribe(() => {
      expect(snackbarServiceMock.error).toHaveBeenCalledWith(
        invalidSignInMessage,
        { variant: 'filled' },
        true,
      );
      done();
    });
  });

  it('should call emailAuth and show error message with incorrect email + password combo', (done) => {
    signInWithEmailAndPasswordSpy.mockRejectedValueOnce({
      code: 'auth/invalid-login-credentials',
    });

    authService.emailAuth(defaultEmail, defaultPassword).subscribe(() => {
      expect(snackbarServiceMock.error).toHaveBeenCalledWith(
        invalidSignInMessage,
        { variant: 'filled' },
        true,
      );
      done();
    });
  });

  it('should call emailAuth and show error message with incorrect password', (done) => {
    signInWithEmailAndPasswordSpy.mockRejectedValueOnce({
      code: 'auth/wrong-password',
    });

    authService.emailAuth(defaultEmail, defaultPassword).subscribe(() => {
      expect(snackbarServiceMock.error).toHaveBeenCalledWith(
        invalidSignInMessage,
        { variant: 'filled' },
        true,
      );
      done();
    });
  });

  it('should call googleAuth and navigate to home on success', (done) => {
    signInWithPopupSpy.mockResolvedValueOnce({});

    authService.googleAuth().subscribe(() => {
      expect(signInWithPopupSpy).toHaveBeenCalledWith(
        authMock,
        expect.any(GoogleAuthProvider),
      );
      expect(routerMock.navigate).toHaveBeenCalledWith(['home']);
      expect(snackbarServiceMock.success).toHaveBeenCalled();
      done();
    });
  });

  it('should call googleAuth and show error snackbar on failure', (done) => {
    signInWithPopupSpy.mockRejectedValueOnce({
      message: defaultErrorMessage,
    });

    authService.googleAuth().subscribe(() => {
      expect(signInWithPopupSpy).toHaveBeenCalledWith(
        authMock,
        expect.any(GoogleAuthProvider),
      );
      expect(snackbarServiceMock.error).toHaveBeenCalledWith(
        defaultErrorMessage,
        { variant: 'filled' },
        true,
      );
      done();
    });
  });

  it('should call githubAuth and navigate to home on success', (done) => {
    signInWithPopupSpy.mockResolvedValueOnce({});

    authService.githubAuth().subscribe(() => {
      expect(signInWithPopupSpy).toHaveBeenCalledWith(
        authMock,
        expect.any(GithubAuthProvider),
      );
      expect(routerMock.navigate).toHaveBeenCalledWith(['home']);
      expect(snackbarServiceMock.success).toHaveBeenCalled();
      done();
    });
  });

  it('should call githubAuth and show error snackbar on failure', (done) => {
    signInWithPopupSpy.mockRejectedValueOnce({
      message: defaultErrorMessage,
    });

    authService.githubAuth().subscribe(() => {
      expect(signInWithPopupSpy).toHaveBeenCalledWith(
        authMock,
        expect.any(GithubAuthProvider),
      );
      expect(snackbarServiceMock.error).toHaveBeenCalledWith(
        defaultErrorMessage,
        { variant: 'filled' },
        true,
      );
      done();
    });
  });

  it('should call authLogin and navigate to home on success', (done) => {
    signInWithPopupSpy.mockResolvedValueOnce({});

    authService.authLogin(authProviderMock).subscribe(() => {
      expect(signInWithPopupSpy).toHaveBeenCalledWith(
        authMock,
        authProviderMock,
      );
      expect(routerMock.navigate).toHaveBeenCalledWith(['home']);
      expect(snackbarServiceMock.success).toHaveBeenCalled();
      done();
    });
  });

  it('should call authLogin and show error snackbar on failure', (done) => {
    signInWithPopupSpy.mockRejectedValueOnce({
      message: defaultErrorMessage,
    });

    authService.authLogin(authProviderMock).subscribe(() => {
      expect(signInWithPopupSpy).toHaveBeenCalledWith(
        authMock,
        authProviderMock,
      );
      expect(snackbarServiceMock.error).toHaveBeenCalledWith(
        defaultErrorMessage,
        { variant: 'filled' },
        true,
      );
      done();
    });
  });

  it('should call authLogout and navigate to sign-in on success', (done) => {
    signOutSpy.mockResolvedValueOnce({});

    authService.authLogout().subscribe(() => {
      expect(signOutSpy).toHaveBeenCalledWith(authMock);
      expect(snackbarServiceMock.success).toHaveBeenCalledWith(
        defaultLogoutSuccessMessage,
        { variant: 'filled', autoClose: true },
        true,
      );
      expect(routerMock.navigate).toHaveBeenCalledWith(['sign-in']);
      done();
    });
  });

  it('should call authLogout and show error snackbar on failure', (done) => {
    signOutSpy.mockRejectedValueOnce({
      message: defaultErrorMessage,
    });

    authService.authLogout().subscribe(() => {
      expect(signOutSpy).toHaveBeenCalledWith(authMock);
      expect(snackbarServiceMock.error).toHaveBeenCalledWith(
        defaultErrorMessage,
        { variant: 'filled' },
        true,
      );
      done();
    });
  });

  it('should return a GoogleAuthProvider instance when passed GoogleAuthProvider.PROVIDER_ID', () => {
    const providerId = GoogleAuthProvider.PROVIDER_ID;
    const result = authService.getProvider(providerId);
    expect(result).toBeInstanceOf(GoogleAuthProvider);
  });

  it('should return a GithubAuthProvider instance when passed GithubAuthProvider.PROVIDER_ID', () => {
    const providerId = GithubAuthProvider.PROVIDER_ID;
    const result = authService.getProvider(providerId);
    expect(result).toBeInstanceOf(GithubAuthProvider);
  });

  it('should throw an error when passed an unknown providerId', () => {
    const unknownProviderId = 'unknown_provider';
    expect(() => {
      authService.getProvider(unknownProviderId);
    }).toThrow(`No provider implemented for ${unknownProviderId}`);
  });

  it('should handle login failure when error code account exists with different credentials', () => {
    const error = {
      email: 'test-user@usersrole.com',
      credential: {} as AuthCredential,
      code: 'auth/account-exists-with-different-credential',
    };
    const handleErrorSpy = jest.spyOn(errorHandlerModule, 'handleError');
    fetchSignInMethodsForEmailSpy.mockResolvedValue([
      GoogleAuthProvider.PROVIDER_ID,
    ]);
    signInWithPopupSpy.mockResolvedValue({ user: {} });

    authService.handleAuthLoginFailure(error);

    expect(fetchSignInMethodsForEmailSpy).toHaveBeenCalledWith(
      authMock,
      error.email,
    );
    expect(handleErrorSpy).not.toHaveBeenCalled();
  });

  it('should handle error when unknown conditions', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = {} as any;
    const handleErrorSpy = jest.spyOn(errorHandlerModule, 'handleError');

    authService.handleAuthLoginFailure(error);

    expect(fetchSignInMethodsForEmailSpy).not.toHaveBeenCalled();
    expect(handleErrorSpy).toHaveBeenCalled();
  });

  it('should handle error when linking credentials fails', () => {
    const error = {
      email: 'test-user@usersrole.com',
      credential: {} as AuthCredential,
      code: 'auth/account-exists-with-different-credential',
    };
    jest.spyOn(errorHandlerModule, 'handleError');
    fetchSignInMethodsForEmailSpy.mockResolvedValue([
      GoogleAuthProvider.PROVIDER_ID,
      GithubAuthProvider.PROVIDER_ID,
    ]);
    signInWithPopupSpy.mockResolvedValue({ user: {} });
    linkWithCredentialSpy.mockImplementation(() => {
      throw new Error('Signal credentials error');
    });

    authService.handleAuthLoginFailure(error);

    expect(fetchSignInMethodsForEmailSpy).toHaveBeenCalledWith(
      authMock,
      error.email,
    );
  });

  it('should handle error when sign in with popup fails', () => {
    const error = {
      email: 'test-user@usersrole.com',
      credential: {} as AuthCredential,
      code: 'auth/account-exists-with-different-credential',
    };
    jest.spyOn(errorHandlerModule, 'handleError');
    fetchSignInMethodsForEmailSpy.mockResolvedValue([
      GoogleAuthProvider.PROVIDER_ID,
      GithubAuthProvider.PROVIDER_ID,
    ]);
    signInWithPopupSpy.mockRejectedValue(() => {
      throw new Error('Sign in with popup failed');
    });

    authService.handleAuthLoginFailure(error);

    expect(fetchSignInMethodsForEmailSpy).toHaveBeenCalledWith(
      authMock,
      error.email,
    );
  });

  it('should handle error when fetch sign in methods for email fails', () => {
    const error = {
      email: 'test-user@usersrole.com',
      credential: {} as AuthCredential,
      code: 'auth/account-exists-with-different-credential',
    };
    jest.spyOn(errorHandlerModule, 'handleError');
    fetchSignInMethodsForEmailSpy.mockRejectedValue(() => {
      throw new Error('Fetched failed');
    });

    authService.handleAuthLoginFailure(error);

    expect(fetchSignInMethodsForEmailSpy).toHaveBeenCalledWith(
      authMock,
      error.email,
    );
  });

  it('should handle error when first popup provider method is not supported', () => {
    const error = {
      email: 'test-user@usersrole.com',
      credential: {} as AuthCredential,
      code: 'auth/account-exists-with-different-credential',
    };
    jest.spyOn(errorHandlerModule, 'handleError');
    fetchSignInMethodsForEmailSpy.mockResolvedValue(['unknown-provider.test']);

    authService.handleAuthLoginFailure(error);

    expect(fetchSignInMethodsForEmailSpy).toHaveBeenCalledWith(
      authMock,
      error.email,
    );
  });
});
