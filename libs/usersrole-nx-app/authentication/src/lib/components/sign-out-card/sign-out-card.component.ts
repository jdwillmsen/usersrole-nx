import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'firebase/auth';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SignOutComponent } from '../sign-out/sign-out.component';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatTooltipModule,
  ],
  templateUrl: './sign-out-card.component.html',
  styleUrls: ['./sign-out-card.component.scss'],
})
export class SignOutCardComponent {
  @Input() user: User | undefined;

  checkForPhoto(url: string | null | undefined): boolean {
    return url == null;
  }
}
