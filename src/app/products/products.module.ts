import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/services/shared.module';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SpinnerComponent,
    ProductDetailsComponent,
    HttpClientModule,
    SharedModule,
  ],
})
export class ProductsModule {}
