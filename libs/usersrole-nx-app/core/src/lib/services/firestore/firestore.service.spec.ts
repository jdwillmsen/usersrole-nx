import { TestBed } from '@angular/core/testing';
import { FirestoreService } from './firestore.service';
import { FIRESTORE } from '../../firebase.tokens';

describe('FirestoreService', () => {
  let firestoreService: FirestoreService;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const firestoreMock: jest.Mocked<any> = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: FIRESTORE, useValue: firestoreMock }],
    });
    firestoreService = TestBed.inject(FirestoreService);
  });

  it('should create an instance of FirestoreService', () => {
    expect(firestoreService).toBeInstanceOf(FirestoreService);
  });
});
