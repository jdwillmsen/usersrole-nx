import { InjectionToken } from '@angular/core';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import type { Functions } from 'firebase/functions';

export const FIREBASE_APP = new InjectionToken<FirebaseApp>('firebase.app');
export const AUTH = new InjectionToken<Auth>('firebase.auth');
export const FIRESTORE = new InjectionToken<Firestore>('firebase.firestore');
export const FUNCTIONS = new InjectionToken<Functions>('firebase.functions');
