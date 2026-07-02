import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'usersrole-nx-buttons',
    imports: [MatButtonModule, RouterLink, MatIconModule],
    templateUrl: './buttons.component.html',
    styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {}
