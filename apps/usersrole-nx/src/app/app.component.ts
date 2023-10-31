import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from '@usersrole-nx/main';

@Component({
  standalone: true,
  imports: [RouterModule, MainComponent],
  selector: 'usersrole-nx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
