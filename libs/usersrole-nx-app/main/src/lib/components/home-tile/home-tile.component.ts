import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationTileComponent } from '@usersrole-nx/shared-ui';

@Component({
  selector: 'usersrole-nx-home-tile',
  standalone: true,
  imports: [CommonModule, NavigationTileComponent],
  templateUrl: './home-tile.component.html',
  styleUrls: ['./home-tile.component.scss'],
})
export class HomeTileComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() access = '';
  @Input() link = '/';
}
