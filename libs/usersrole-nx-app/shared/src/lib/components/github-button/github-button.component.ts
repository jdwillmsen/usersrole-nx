import { Component, Input, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'usersrole-nx-github-button',
    imports: [MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: './github-button.component.html',
    styleUrls: ['./github-button.component.scss']
})
export class GithubButtonComponent {
  private readonly matIconRegistry = inject(MatIconRegistry);
  private readonly domSanitizer = inject(DomSanitizer);

  // TODO: Check if theme is needed for when using on dark/light backgrounds
  @Input() githubLink = 'https://github.com';
  constructor() {
    this.matIconRegistry.addSvgIcon(
      'github-logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/github-icon.svg',
      ),
    );
  }
}
