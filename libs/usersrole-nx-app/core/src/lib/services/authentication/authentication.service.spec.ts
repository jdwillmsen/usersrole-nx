import { AuthenticationService } from './authentication.service';
import { of } from 'rxjs';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import * as errorHandlerModule from '../error-handler/error-handler.service';

describe('AuthenticationService', () => {
  let authService: AuthenticationService;
  const angularFireAuthMock: jest.Mocked<any> = {
    authState: of(null),
    signInWithEmailAndPassword: jest.fn(),
    signInWithPopup: jest.fn(),
    signOut: jest.fn(),
    fetchSignInMethodsForEmail: jest.fn(),
  };
  const routerMock: jest.Mocked<any> = {
    navigate: jest.fn(() => Promise.resolve(true)),
  };
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

  beforeEach(() => {
    authService = new AuthenticationService(
      angularFireAuthMock,
      routerMock,
      snackbarServiceMock,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
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
    angularFireAuthMock.signInWithEmailAndPassword.mockResolvedValueOnce({});

    authService.emailAuth(defaultEmail, defaultPassword).subscribe(() => {
      expect(
        angularFireAuthMock.signInWithEmailAndPassword,
      ).toHaveBeenCalledWith(defaultEmail, defaultPassword);
      expect(routerMock.navigate).toHaveBeenCalledWith(['home']);
      expect(snackbarServiceMock.success).toHaveBeenCalled();
      done();
    });
  });

  it('should call emailAuth and show error snackbar on failure', (done) => {
    angularFireAuthMock.signInWithEmailAndPassword.mockRejectedValueOnce({
      message: defaultErrorMessage,
    });

    authService.emailAuth(defaultEmail, defaultPassword).subscribe(() => {
      expect(
        angularFireAuthMock.signInWithEmailAndPassword,
      ).toHaveBeenCalledWith(defaultEmail, defaultPassword);
      expect(snackbarServiceMock.error).toHaveBeenCalledWith(
        defaultErrorMessage,
        { variant: 'filled' },
        true,
      );
      done();
    });
  });

  it('should call emailAuth and show error message with incorrect email', (done) => {
    angularFireAuthMock.signInWithEmailAndPassword.mockRejectedValueOnce({
      code: 'auth/user-not-found',
    });

    authService.emailAuth(defaultEmail, defaultPassword).subscribe(() => {
      expect(
        angularFireAuthMock.signInWithEmailAndPassword,
      ).toHaveBeenCalledWith(defaultEmail, defaultPassword);
      expect(snackbarServiceMock.error).toHaveBeenCalledWith(
        invalidSignInMessage,
        { variant: 'filled' },
        true,
      );
      done();
    });
  });

  it('should call emailAuth and show error message with incorrect email + password combo', (done) => {
    angularFireAuthMock.signInWithEmailAndPassword.mockRejectedValueOnce({
      code: 'auth/invalid-login-credentials',
    });

    authService.emailAuth(defaultEmail, defaultPassword).subscribe(() => {
      expect(
        angularFireAuthMock.signInWithEmailAndPassword,
      ).toHaveBeenCalledWith(defaultEmail, defaultPassword);
      expect(snackbarServiceMock.error).toHaveBeenCalledWith(
        invalidSignInMessage,
        { variant: 'filled' },
        true,
      );
      done();
    });
  });

  it('should call emailAuth and show error message with incorrect password', (done) => {
    angularFireAuthMock.signInWithEmailAndPassword.mockRejectedValueOnce({
      code: 'auth/wrong-password',
    });

    authService.emailAuth(defaultEmail, defaultPassword).subscribe(() => {
      expect(
        angularFireAuthMock.signInWithEmailAndPassword,
      ).toHaveBeenCalledWith(defaultEmail, defaultPassword);
      expect(snackbarServiceMock.error).toHaveBeenCalledWith(
        invalidSignInMessage,
        { variant: 'filled' },
        true,
      );
      done();
    });
  });

  it('should call googleAuth and navigate to home on success', (done) => {
    angularFireAuthMock.signInWithPopup.mockResolvedValueOnce({});

    authService.googleAuth().subscribe(() => {
      expect(angularFireAuthMock.signInWithPopup).toHaveBeenCalledWith(
        expect.any(GoogleAuthProvider),
      );
      expect(routerMock.navigate).toHaveBeenCalledWith(['home']);
      expect(snackbarServiceMock.success).toHaveBeenCalled();
      done();
    });
  });

  it('should call googleAuth and show error snackbar on failure', (done) => {
    angularFireAuthMock.signInWithPopup.mockRejectedValueOnce({
      message: defaultErrorMessage,
    });

    authService.googleAuth().subscribe(() => {
      expect(angularFireAuthMock.signInWithPopup).toHaveBeenCalledWith(
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
    angularFireAuthMock.signInWithPopup.mockResolvedValueOnce({});

    authService.githubAuth().subscribe(() => {
      expect(angularFireAuthMock.signInWithPopup).toHaveBeenCalledWith(
        expect.any(GithubAuthProvider),
      );
      expect(routerMock.navigate).toHaveBeenCalledWith(['home']);
      expect(snackbarServiceMock.success).toHaveBeenCalled();
      done();
    });
  });

  it('should call githubAuth and show error snackbar on failure', (done) => {
    angularFireAuthMock.signInWithPopup.mockRejectedValueOnce({
      message: defaultErrorMessage,
    });

    authService.githubAuth().subscribe(() => {
      expect(angularFireAuthMock.signInWithPopup).toHaveBeenCalledWith(
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
    angularFireAuthMock.signInWithPopup.mockResolvedValueOnce({});

    authService.authLogin(authProviderMock).subscribe(() => {
      expect(angularFireAuthMock.signInWithPopup).toHaveBeenCalledWith(
        authProviderMock,
      );
      expect(routerMock.navigate).toHaveBeenCalledWith(['home']);
      expect(snackbarServiceMock.success).toHaveBeenCalled();
      done();
    });
  });

  it('should call authLogin and show error snackbar on failure', (done) => {
    angularFireAuthMock.signInWithPopup.mockRejectedValueOnce({
      message: defaultErrorMessage,
    });

    authService.authLogin(authProviderMock).subscribe(() => {
      expect(angularFireAuthMock.signInWithPopup).toHaveBeenCalledWith(
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
    angularFireAuthMock.signOut.mockResolvedValueOnce({});

    authService.authLogout().subscribe(() => {
      expect(angularFireAuthMock.signOut).toHaveBeenCalled();
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
    angularFireAuthMock.signOut.mockRejectedValueOnce({
      message: defaultErrorMessage,
    });

    authService.authLogout().subscribe(() => {
      expect(angularFireAuthMock.signOut).toHaveBeenCalled();
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
      credential: true,
      code: 'auth/account-exists-with-different-credential',
    };
    const handleErrorSpy = jest.spyOn(errorHandlerModule, 'handleError');
    angularFireAuthMock.fetchSignInMethodsForEmail.mockResolvedValue([
      GoogleAuthProvider.PROVIDER_ID,
    ]);
    angularFireAuthMock.signInWithPopup.mockResolvedValue({
      user: { linkWithCredential: jest.fn() },
    });

    authService.handleAuthLoginFailure(error);

    expect(angularFireAuthMock.fetchSignInMethodsForEmail).toHaveBeenCalledWith(
      error.email,
    );
    expect(handleErrorSpy).not.toHaveBeenCalled();
  });

  it('should handle error when unknown conditions', () => {
    const error = {};
    const handleErrorSpy = jest.spyOn(errorHandlerModule, 'handleError');

    authService.handleAuthLoginFailure(error);

    expect(
      angularFireAuthMock.fetchSignInMethodsForEmail,
    ).not.toHaveBeenCalled();
    expect(handleErrorSpy).toHaveBeenCalled();
  });

  it('should handle error when linking credentials fails', () => {
    const error = {
      email: 'test-user@usersrole.com',
      credential: true,
      code: 'auth/account-exists-with-different-credential',
    };
    jest.spyOn(errorHandlerModule, 'handleError');
    angularFireAuthMock.fetchSignInMethodsForEmail.mockResolvedValue([
      GoogleAuthProvider.PROVIDER_ID,
      GithubAuthProvider.PROVIDER_ID,
    ]);
    angularFireAuthMock.signInWithPopup.mockResolvedValue({
      user: {
        linkWithCredential: () => {
          throw new Error('Signal credentials error');
        },
      },
    });

    authService.handleAuthLoginFailure(error);

    expect(angularFireAuthMock.fetchSignInMethodsForEmail).toHaveBeenCalledWith(
      error.email,
    );
  });

  it('should handle error when sign in with popup fails', () => {
    const error = {
      email: 'test-user@usersrole.com',
      credential: true,
      code: 'auth/account-exists-with-different-credential',
    };
    jest.spyOn(errorHandlerModule, 'handleError');
    angularFireAuthMock.fetchSignInMethodsForEmail.mockResolvedValue([
      GoogleAuthProvider.PROVIDER_ID,
      GithubAuthProvider.PROVIDER_ID,
    ]);
    angularFireAuthMock.signInWithPopup.mockRejectedValue(() => {
      throw new Error('Sign in with popup failed');
    });

    authService.handleAuthLoginFailure(error);

    expect(angularFireAuthMock.fetchSignInMethodsForEmail).toHaveBeenCalledWith(
      error.email,
    );
  });

  it('should handle error when fetch sign in methods for email fails', () => {
    const error = {
      email: 'test-user@usersrole.com',
      credential: true,
      code: 'auth/account-exists-with-different-credential',
    };
    jest.spyOn(errorHandlerModule, 'handleError');
    angularFireAuthMock.fetchSignInMethodsForEmail.mockRejectedValue(() => {
      throw new Error('Fetched failed');
    });

    authService.handleAuthLoginFailure(error);

    expect(angularFireAuthMock.fetchSignInMethodsForEmail).toHaveBeenCalledWith(
      error.email,
    );
  });

  it('should handle error when first popup provider method is not supported', () => {
    const error = {
      email: 'test-user@usersrole.com',
      credential: true,
      code: 'auth/account-exists-with-different-credential',
    };
    jest.spyOn(errorHandlerModule, 'handleError');
    angularFireAuthMock.fetchSignInMethodsForEmail.mockResolvedValue([
      'unknown-provider.test',
    ]);

    authService.handleAuthLoginFailure(error);

    expect(angularFireAuthMock.fetchSignInMethodsForEmail).toHaveBeenCalledWith(
      error.email,
    );
  });
});
