import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faStarHalf } from '@fortawesome/free-solid-svg-icons/faStarHalf';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons/faStar'; // Import empty star icon
import { ProductsService } from '../../service/products.service';
import {
  NgClass,
  NgFor,
  NgIf,
  SlicePipe,
  UpperCasePipe,
} from '@angular/common';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { CartService } from '../../../carts/services/carts.service';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [
    RouterLink,
    FontAwesomeModule,
    SlicePipe,
    NgFor,
    NgIf,
    UpperCasePipe,
    SpinnerComponent,
    NgClass,
  ],
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  faStar = faStar;
  faStarHalf = faStarHalf;
  faStarOutline = faStarOutline;
  categories: any[] = [];
  cartProducts: any[] = [];
  loading: boolean = true;

  constructor(
    private services: ProductsService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategory();
  }

  getProducts() {
    this.loading = true;
    this.services.getProducts().subscribe((res: any) => {
      this.products = res.products;
      this.loading = false;
      console.log(res);
    });
  }

  getCategory() {
    this.loading = true;
    this.services.getCategories().subscribe((res: any) => {
      this.categories = res;
      this.loading = false;
      console.log(res);
    });
  }

  getFilterCategory(event: any) {
    let value = event.target.value;
    console.log(value);

    if (value === 'All') {
      this.getProducts();
    } else {
      this.loading = true;
      this.services.getProductsByCategory(value).subscribe((res: any) => {
        this.products = res.products || res;
        this.loading = false;
      });
    }
  }

  getProductCategory(val: string) {
    this.loading = true;
    this.services.getProductsByCategory(val).subscribe((res: any) => {
      this.products = res.products || res;
      this.loading = false;
    });
  }

  // Get full stars
  getStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    return new Array(fullStars).fill(0);
  }

  // Get empty stars
  getEmptyStars(rating: number): number[] {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return new Array(totalStars - fullStars - (hasHalfStar ? 1 : 0)).fill(0);
  }

  AddToCart(id: any) {
    const product = this.products.find((val: any) => val.id === id);
    if (!product) {
      console.error('Product not found:', id);
      return;
    }

    console.log('Selected Product:', product);

    const storedCart = localStorage.getItem('cart');
    this.cartProducts = storedCart ? JSON.parse(storedCart) : [];

    const existingItem = this.cartProducts.find((item: any) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
      alert('Product quantity updated in the cart');
    } else {
      product.quantity = 1;
      this.cartProducts.push(product);
      console.log('Product added to cart:', product);
    }

    try {
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    } catch (error) {
      console.error('Error storing cart in localStorage:', error);
    }
  }

  calculateDiscountedPrice(price: number, discountPercentage: number): number {
    const discountedPrice = price - price * (discountPercentage / 100);
    return parseFloat(discountedPrice.toFixed(2));
  }
  goToSinglePage(id: any) {
    this.router.navigate(['details', id]);
  }
}
