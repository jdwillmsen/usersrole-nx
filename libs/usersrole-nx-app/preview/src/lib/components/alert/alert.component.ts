import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { Alert, AlertVariants } from '@usersrole-nx/shared';
import { Subscription } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'usersrole-nx-alert',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('fade', [
      transition('true => void', [
        style({ opacity: 1 }),
        animate('{{fadeTime}}ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = false;
  @Input() fadeTime = 500;
  @Input() variant: AlertVariants = 'default';
  @Input() alerts: Alert[] = [];
  alertSubscription!: Subscription;
  routeSubscription!: Subscription;
  autoCloseTimeout = 3000;

  constructor(private router: Router, private alertService: AlertService) {}

  ngOnInit() {
    this.alertSubscription = this.alertService
      .onAlert(this.id)
      .subscribe((alert) => {
        if (!alert?.message) {
          this.alerts = this.alerts.filter(
            (alert) => alert.keepAfterRouteChange
          );
          this.alerts.forEach((alert) => delete alert.keepAfterRouteChange);
          return;
        }
        if (alert.maxSize && alert.maxSize > 0) {
          while (this.alerts.length >= alert.maxSize) {
            this.alerts.shift();
          }
          this.alerts.push(alert);
        } else {
          this.alerts.push(alert);
        }
        if (alert?.autoClose) {
          if (alert.autoCloseTimeout && alert.autoCloseTimeout > 0) {
            this.autoCloseTimeout = alert.autoCloseTimeout;
          }
          setTimeout(() => this.removeAlert(alert), this.autoCloseTimeout);
        }
      });

    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    });
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    if (!this.alerts.includes(alert)) return;

    const timeout = this.fade ? this.fadeTime : 0;
    alert.fade = this.fade;

    setTimeout(() => {
      this.alerts = this.alerts.filter((alt) => alt !== alert);
    }, timeout);
  }

  cssClass(alert: Alert) {
    if (!alert) return;

    const classes = ['alert'];

    if (alert.type !== undefined) {
      classes.push(alert.type);
    }

    if (this.variant !== 'default') {
      classes.push(this.variant);
    }

    return classes.join(' ');
  }
}
