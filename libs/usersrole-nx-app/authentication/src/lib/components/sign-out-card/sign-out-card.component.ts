import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import firebase from 'firebase/compat/app';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SignOutComponent } from '../sign-out/sign-out.component';

@Component({
  selector: 'usersrole-nx-sign-out-card',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    SignOutComponent,
  ],
  templateUrl: './sign-out-card.component.html',
  styleUrls: ['./sign-out-card.component.scss'],
})
export class SignOutCardComponent {
  @Input() user: firebase.User | undefined;

  checkForPhoto(url: string | null | undefined): boolean {
    return url == null;
  }
}
