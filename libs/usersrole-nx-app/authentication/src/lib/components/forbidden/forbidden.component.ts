import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'usersrole-nx-forbidden',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss'],
})
export class ForbiddenComponent {
  @Input() redirectLink = '/home';
  @Input() redirectIcon = 'home';
  @Input() redirectText = 'Home';
}
