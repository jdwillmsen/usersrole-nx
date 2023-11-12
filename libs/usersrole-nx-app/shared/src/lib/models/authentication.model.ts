import {
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth';

export type SupportedPopupSignInMethods =
  | 'google.com'
  | 'github.com'
  | 'twitter.com';
export type SupportedAuthProviders =
  | GoogleAuthProvider
  | GithubAuthProvider
  | TwitterAuthProvider;
