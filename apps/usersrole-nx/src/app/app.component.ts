import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HeaderComponent, MainComponent} from "@usersrole-nx/shared-ui";

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, MainComponent],
  selector: 'usersrole-nx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'usersrole-nx';
}
