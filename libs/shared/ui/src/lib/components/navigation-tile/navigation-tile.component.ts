import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'usersrole-nx-navigation-tile',
  imports: [RouterLink, MatCardModule],
  templateUrl: './navigation-tile.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./navigation-tile.component.scss'],
})
export class NavigationTileComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() link = '/';
}
