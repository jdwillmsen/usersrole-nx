import {
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth';
import { SupportedPopupSignInMethods } from '../models/authentication.model';

export const ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL =
  'auth/account-exists-with-different-credential';
export const USER_NOT_FOUND = 'auth/user-not-found';
export const WRONG_PASSWORD = 'auth/wrong-password';
export const WRONG_USERNAME = 'auth/invalid-login-credentials';
export const SUPPORTED_POPUP_SIGN_IN_METHODS: SupportedPopupSignInMethods[] = [
  GoogleAuthProvider.PROVIDER_ID,
  GithubAuthProvider.PROVIDER_ID,
  TwitterAuthProvider.PROVIDER_ID,
];
