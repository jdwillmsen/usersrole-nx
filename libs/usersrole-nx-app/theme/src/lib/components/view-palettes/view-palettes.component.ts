import { Component } from '@angular/core';

import { PaletteComponent } from '../palette/palette.component';

@Component({
    selector: 'usersrole-nx-view-palettes',
    imports: [PaletteComponent],
    templateUrl: './view-palettes.component.html',
    styleUrls: ['./view-palettes.component.scss']
})
export class ViewPalettesComponent {
  palettes = ['Primary', 'Accent', 'Success', 'Error', 'Info', 'Warn'];
}
