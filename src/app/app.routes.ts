import { Routes } from '@angular/router';
import { CartComponent } from './carts/components/cart/cart.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: AllProductsComponent,
    title: 'E-commerce App | Home ',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'E-commerce App | Login ',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'E-commerce App | Register ',
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'E-commerce App | Cart ',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'E-commerce App | Not Found ',
  },
];
