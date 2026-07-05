import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from '@usersrole-nx/main';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

@Component({
  imports: [RouterModule, MainComponent],
  selector: 'usersrole-nx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private swUpdate = inject(SwUpdate);

  constructor() {
    // Without this, ngsw keeps serving the previous build until a second
    // manual reload, so users kept hitting bugs already fixed in production.
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates
        .pipe(
          filter(
            (event): event is VersionReadyEvent =>
              event.type === 'VERSION_READY',
          ),
        )
        .subscribe(() => document.location.reload());
    }
  }
}
