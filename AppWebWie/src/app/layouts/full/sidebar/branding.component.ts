import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding" style="background-color:#DDCCF8 !important;">
      <a href="/">
        <img
          src="./assets/images/logos/logoWieApp.png"
          height="50"
          class="align-middle m-2"
          alt="logo"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
