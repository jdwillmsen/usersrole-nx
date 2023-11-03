import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { Alert, AlertVariants } from '../../models/alert.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'usersrole-nx-alert',
  standalone: true,
  imports: [CommonModule],
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
export class AlertComponent {
  @Input() id = 'default-alert';
  @Input() fade = false;
  @Input() fadeTime = 500;
  @Input() variant: AlertVariants = 'default';
  alerts: Alert[] = [];
  alertSubscription!: Subscription;
  routeSubscription!: Subscription;
  autoCloseTimeout = 3000;

  // constructor(private router: Router, private alertService: AlertService) {}
}
