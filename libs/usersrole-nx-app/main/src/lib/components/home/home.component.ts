import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTileComponent } from '../home-tile/home-tile.component';
import { HomeTile } from '../../models/home-tile.model';

@Component({
  selector: 'usersrole-nx-home',
  standalone: true,
  imports: [CommonModule, HomeTileComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // TODO: Finish implementation and testing
  tiles: HomeTile[] = [
    {
      title: 'Home',
      link: '/home',
      description: 'This is the home link and is currently being displayed.',
      access: ['Everyone'],
    },
    {
      title: 'Profile',
      link: '/user/profile',
      description:
        'This is a profile page for viewing information about the logged in user.',
      access: ['User'],
    },
    {
      title: 'Alerts',
      link: '/preview/alerts',
      description:
        'This is a page for viewing the alert service/alerts provided in this application.',
      access: ['Everyone'],
    },
    {
      title: 'Snackbars',
      link: '/preview/snackbars',
      description:
        'This is a page for viewing the snackbar service/snackbars provided in this application.',
      access: ['Everyone'],
    },
    {
      title: 'Buttons',
      link: '/preview/buttons',
      description:
        'This is a page for viewing the additional palettes applied on buttons provided in this application.',
      access: ['Everyone'],
    },
    {
      title: 'Palettes',
      link: '/theme/view',
      description:
        'This is a page for viewing the different color palettes for the current theme.',
      access: ['Everyone'],
    },
    {
      title: 'Theme',
      link: '/theme/create',
      description: 'This is a page for creating a custom theme.',
      access: ['Everyone'],
    },
    {
      title: 'Users',
      link: '/admin/users',
      description:
        'This is a page for viewing all the users associated with the application.',
      access: ['Read', 'Admin', 'Manager'],
    },
    {
      title: 'Roles',
      link: '/admin/roles',
      description: 'This is the home link and is currently being displayed.',
      access: ['Read', 'Admin', 'Manager'],
    },
  ];
}
