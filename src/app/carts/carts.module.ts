import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, CartComponent],
  exports: [CartComponent],
})
export class CartsModule {}
