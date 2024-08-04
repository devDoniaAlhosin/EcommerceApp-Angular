import { CommonModule, NgFor, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgFor,
    SlicePipe,
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    RouterLink,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartProducts: any[] = [];
  faCartShopping = faCartShopping;

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    } else {
      this.cartProducts = [];
    }
  }

  increaseQuantity(item: any) {
    if (item.quantity < item.stock) {
      item.quantity++;
      this.updateTotalPrice();
    }
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateTotalPrice();
    }
  }

  removeItem(item: any) {
    this.cartProducts = this.cartProducts.filter(
      (cartItem) => cartItem !== item
    );
    this.updateLocalStorage();
  }

  clearCart() {
    this.cartProducts = [];
    localStorage.removeItem('cart');
  }

  updateTotalPrice() {
    this.updateLocalStorage();
  }

  getSubTotal() {
    return this.cartProducts.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  orderNow() {}
}
