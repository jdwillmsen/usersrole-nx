import { FirestoreService } from './firestore.service';

describe('FirestoreService', () => {
  let firestoreService: FirestoreService;
  const firestoreMock: jest.Mocked<any> = {};

  beforeEach(() => {
    firestoreService = new FirestoreService(firestoreMock);
  });

  it('should create an instance of FirestoreService', () => {
    expect(firestoreService).toBeInstanceOf(FirestoreService);
  });
});
