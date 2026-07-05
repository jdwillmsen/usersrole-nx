import { Component, VERSION } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { VERSION_INFO } from '../../generated/version-info';

const REPO_URL = 'https://github.com/jdwillmsen/usersrole-nx';

@Component({
  selector: 'usersrole-nx-about',
  imports: [MatCardModule, KeyValuePipe],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  readonly info = VERSION_INFO;
  readonly repoUrl = REPO_URL;
  readonly angularVersion = VERSION.full;

  // Zoneless CD ships without zone.js; its absence confirms the mode at runtime.
  readonly zoneless =
    typeof (window as unknown as { Zone?: unknown }).Zone === 'undefined';
  readonly appCheck = 'disabled'; // App Check is not configured for this app.
  readonly browser = navigator.userAgent;
  readonly platform = navigator.platform;

  readonly project = {
    description: 'Users role and authentication template application.',
    author: 'Jake Willmsen',
    license: 'MIT',
  };

  get commitUrl(): string | null {
    return this.info.commit && this.info.commit !== 'dev'
      ? `${this.repoUrl}/commit/${this.info.commit}`
      : null;
  }
}
