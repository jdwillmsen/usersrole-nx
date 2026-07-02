import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaletteComponent } from '../palette/palette.component';

@Component({
    selector: 'usersrole-nx-view-palettes',
    imports: [CommonModule, PaletteComponent],
    templateUrl: './view-palettes.component.html',
    styleUrls: ['./view-palettes.component.scss']
})
export class ViewPalettesComponent {
  palettes = ['Primary', 'Accent', 'Success', 'Error', 'Info', 'Warn'];
}
