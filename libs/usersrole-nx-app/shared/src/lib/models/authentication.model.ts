import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';

export type SupportedPopupSignInMethods = 'google.com' | 'github.com';
export type SupportedAuthProviders = GoogleAuthProvider | GithubAuthProvider;
