import { Component } from '@angular/core';

interface StackItem {
  name: string;
  version: string;
  description: string;
}

@Component({
  selector: 'usersrole-nx-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  stack: StackItem[] = [
    {
      name: 'Angular',
      version: '21',
      description: 'Frontend framework with standalone components and signals',
    },
    {
      name: 'Angular Material',
      version: '21',
      description: 'UI component library and theming system',
    },
    {
      name: 'Nx',
      version: '23',
      description: 'Monorepo build system with caching and affected commands',
    },
    {
      name: 'Firebase',
      version: '12',
      description:
        'Authentication, Cloud Functions, and hosting for all deployments',
    },
    {
      name: 'ag-grid',
      version: '36',
      description: 'Data grid used for the users and roles admin pages',
    },
    {
      name: 'Jest & Cypress',
      version: '',
      description: 'Unit testing and component/end-to-end testing',
    },
  ];
}
