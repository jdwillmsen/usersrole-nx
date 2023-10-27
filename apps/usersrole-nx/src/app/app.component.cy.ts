import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { mount } from 'cypress/angular';

describe(AppComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(AppComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    mount(AppComponent);
  });
});
