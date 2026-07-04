import { Component, Input } from '@angular/core';

import { NavigationTileComponent } from '@usersrole-nx/shared-ui';

@Component({
  selector: 'usersrole-nx-home-tile',
  imports: [NavigationTileComponent],
  templateUrl: './home-tile.component.html',
  styleUrls: ['./home-tile.component.scss'],
})
export class HomeTileComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() access = '';
  @Input() link = '/';
}
