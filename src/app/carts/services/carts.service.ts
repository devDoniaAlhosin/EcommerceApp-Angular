import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<any[]>(this.loadCartProducts());
  cart$ = this.cartSubject.asObservable();

  constructor() {}

  private loadCartProducts(): any[] {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) || [] : [];
  }

  getCartProducts(): any[] {
    return this.cartSubject.getValue();
  }

  addToCart(product: any) {
    let cart = this.getCartProducts();
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      exists.quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    this.updateCart(cart);
  }

  removeFromCart(productId: any) {
    let cart = this.getCartProducts();
    cart = cart.filter((item) => item.id !== productId);
    this.updateCart(cart);
  }

  updateCart(cart: any[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);
  }
}
