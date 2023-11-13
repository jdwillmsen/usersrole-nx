import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Role } from '@usersrole-nx/shared';
import { ICellRendererParams } from 'ag-grid-community';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'usersrole-nx-roles-cell-renderer',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatTooltipModule],
  templateUrl: './roles-cell-renderer.component.html',
  styleUrls: ['./roles-cell-renderer.component.scss'],
})
export class RolesCellRendererComponent implements ICellRendererAngularComp {
  @Input() roles: Role[] = [];

  agInit(params: ICellRendererParams): void {
    this.roles = params.value;
  }

  refresh() {
    return false;
  }
}
