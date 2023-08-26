import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Sign2PageRoutingModule } from './sign2-routing.module';

import { Sign2Page } from './sign2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Sign2PageRoutingModule
  ],
  declarations: [Sign2Page]
})
export class Sign2PageModule {}
