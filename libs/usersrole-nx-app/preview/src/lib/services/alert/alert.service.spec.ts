import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';
import { PaletteColors } from '@usersrole-nx/shared';
import { Alert, AlertOptions } from '@usersrole-nx/shared';

describe('AlertService', () => {
  let service: AlertService;
  const defaultAlertType: PaletteColors = 'primary';
  const defaultAlertMessage = 'default alert message';
  const defaultAlert = {
    type: defaultAlertType,
    message: defaultAlertMessage,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an instance of AlertService', () => {
    expect(service).toBeInstanceOf(AlertService);
  });

  it('should alert a message', (done) => {
    service.onAlert().subscribe((alert) => {
      expect(alert).toEqual(defaultAlert);
      done();
    });

    service.alert(defaultAlert);
  });

  it('should clear an alert', (done) => {
    const response = { id: 'default-alert' };

    service.onAlert().subscribe((alert) => {
      expect(alert).toEqual(response);
      done();
    });

    service.alert(defaultAlert);
    service.clear();
  });

  it('should send an alert with options', (done) => {
    const alertOptions: AlertOptions = {
      id: 'options-id',
      autoClose: false,
      autoCloseTimeout: 5000,
      keepAfterRouteChange: false,
      icon: 'bug_report',
      closeButton: true,
      maxSize: 5,
    };

    service.onAlert(alertOptions.id).subscribe((alert) => {
      expect(alert.type).toBe(defaultAlertType);
      expect(alert.message).toBe(defaultAlertMessage);
      expect(alert.id).toBe(alertOptions.id);
      expect(alert.autoClose).toBe(alertOptions.autoClose);
      expect(alert.autoCloseTimeout).toBe(alertOptions.autoCloseTimeout);
      expect(alert.keepAfterRouteChange).toBe(
        alertOptions.keepAfterRouteChange
      );
      expect(alert.icon).toBe(alertOptions.icon);
      expect(alert.closeButton).toBe(alertOptions.closeButton);
      expect(alert.maxSize).toBe(alertOptions.maxSize);
      done();
    });

    service.send(defaultAlertType, defaultAlertMessage, alertOptions);
  });

  it('should send an alert with a close button', (done) => {
    const testAlert: Alert = {
      closeButton: false,
    };

    service.onAlert().subscribe((alert) => {
      expect(alert.closeButton).toEqual(testAlert.closeButton);
      done();
    });

    service.alert(testAlert);
  });

  it('should send a primary alert', (done) => {
    const alertType: PaletteColors = 'primary';

    service.onAlert().subscribe((alert) => {
      expect(alert.type).toEqual(alertType);
      expect(alert.message).toEqual(defaultAlertMessage);
      expect(alert.icon).toBeUndefined();
      done();
    });

    service.send(alertType, defaultAlertMessage);
  });

  it('should send an accent alert', (done) => {
    const alertType: PaletteColors = 'accent';

    service.onAlert().subscribe((alert) => {
      expect(alert.type).toEqual(alertType);
      expect(alert.message).toEqual(defaultAlertMessage);
      expect(alert.icon).toBeUndefined();
      done();
    });

    service.send(alertType, defaultAlertMessage);
  });

  it('should send a success alert', (done) => {
    const alertType: PaletteColors = 'success';

    service.onAlert().subscribe((alert) => {
      expect(alert.type).toEqual(alertType);
      expect(alert.message).toEqual(defaultAlertMessage);
      expect(alert.icon).toBeUndefined();
      done();
    });

    service.success(defaultAlertMessage);
  });

  it('should send a success alert with default icon', (done) => {
    const alertType: PaletteColors = 'success';
    const alertIcon = 'check_circle';

    service.onAlert().subscribe((alert) => {
      expect(alert.type).toEqual(alertType);
      expect(alert.message).toEqual(defaultAlertMessage);
      expect(alert.icon).toEqual(alertIcon);
      done();
    });

    service.success(defaultAlertMessage, {}, true);
  });

  it('should send an error alert', (done) => {
    const alertType: PaletteColors = 'error';

    service.onAlert().subscribe((alert) => {
      expect(alert.type).toEqual(alertType);
      expect(alert.message).toEqual(defaultAlertMessage);
      expect(alert.icon).toBeUndefined();
      done();
    });

    service.error(defaultAlertMessage);
  });

  it('should send an error alert with default icon', (done) => {
    const alertType: PaletteColors = 'error';
    const alertIcon = 'report';

    service.onAlert().subscribe((alert) => {
      expect(alert.type).toEqual(alertType);
      expect(alert.message).toEqual(defaultAlertMessage);
      expect(alert.icon).toEqual(alertIcon);
      done();
    });

    service.error(defaultAlertMessage, {}, true);
  });

  it('should send a warn alert', (done) => {
    const alertType: PaletteColors = 'warn';

    service.onAlert().subscribe((alert) => {
      expect(alert.type).toEqual(alertType);
      expect(alert.message).toEqual(defaultAlertMessage);
      expect(alert.icon).toBeUndefined();
      done();
    });

    service.warn(defaultAlertMessage);
  });

  it('should send a warn alert with default icon', (done) => {
    const alertType: PaletteColors = 'warn';
    const alertIcon = 'warning';

    service.onAlert().subscribe((alert) => {
      expect(alert.type).toEqual(alertType);
      expect(alert.message).toEqual(defaultAlertMessage);
      expect(alert.icon).toEqual(alertIcon);
      done();
    });

    service.warn(defaultAlertMessage, {}, true);
  });

  it('should send an info alert', (done) => {
    const alertType: PaletteColors = 'info';

    service.onAlert().subscribe((alert) => {
      expect(alert.type).toEqual(alertType);
      expect(alert.message).toEqual(defaultAlertMessage);
      expect(alert.icon).toBeUndefined();
      done();
    });

    service.info(defaultAlertMessage);
  });

  it('should send an info alert with default icon', (done) => {
    const alertType: PaletteColors = 'info';
    const alertIcon = 'info';

    service.onAlert().subscribe((alert) => {
      expect(alert.type).toEqual(alertType);
      expect(alert.message).toEqual(defaultAlertMessage);
      expect(alert.icon).toEqual(alertIcon);
      done();
    });

    service.info(defaultAlertMessage, {}, true);
  });
});
