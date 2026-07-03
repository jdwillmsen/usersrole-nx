import { TestBed } from '@angular/core/testing';

import { ErrorHandlerService } from './error-handler.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let zoneRunSpy: jest.SpyInstance;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const snackbarServiceMock: jest.Mocked<any> = {
    error: jest.fn(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorHandlerService,
        { provide: SnackbarService, useValue: snackbarServiceMock },
      ],
    });
    service = TestBed.inject(ErrorHandlerService);
    zoneRunSpy = jest.spyOn(service.zone, 'run');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an instance of ErrorHandlerService', () => {
    expect(service).toBeInstanceOf(ErrorHandlerService);
  });

  it('should call zone.run when handleError is called', () => {
    const errorMock = new Error('Test error');

    service.handleError(errorMock);

    expect(zoneRunSpy).toHaveBeenCalled();
  });

  it('should log the error message to console when handleError is called', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn');
    const errorMock = new Error('Test error');
    service.handleError(errorMock);

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Caught by Error Handler Service: ',
      errorMock,
    );
    consoleWarnSpy.mockRestore();
  });
});

describe('ErrorHandlerService', () => {
  let errorHandlerService: ErrorHandlerService;
  let snackbarService: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, NoopAnimationsModule],
      providers: [ErrorHandlerService, SnackbarService],
    });
    errorHandlerService = TestBed.inject(ErrorHandlerService);
    snackbarService = TestBed.inject(SnackbarService);
  });

  it('should call snackbarService error when handling an error', async () => {
    const error = new Error('Test error');
    const snackbarServiceSpy = jest.spyOn(snackbarService, 'error');

    await new Promise<void>((resolve) => {
      errorHandlerService.handleError(error);
      errorHandlerService.zone.run(() => {
        expect(snackbarServiceSpy).toHaveBeenCalledWith(
          'An error has occurred',
          { variant: 'filled' },
          true,
        );
        resolve();
      });
    });
  });

  it('should not call snackbarService error for Firebase errors', async () => {
    const firebaseError = {
      rejection: {
        name: 'FirebaseError',
      },
    };
    const snackbarServiceSpy = jest.spyOn(snackbarService, 'error');

    await new Promise<void>((resolve) => {
      errorHandlerService.handleError(firebaseError);
      errorHandlerService.zone.run(() => {
        expect(snackbarServiceSpy).not.toHaveBeenCalled();
        resolve();
      });
    });
  });
});
