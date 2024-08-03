import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faStarHalf } from '@fortawesome/free-solid-svg-icons/faStarHalf';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons/faStar'; // Import empty star icon
import { ProductsService } from '../../service/products.service';
import { NgFor, NgIf, SlicePipe, UpperCasePipe } from '@angular/common';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

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

  constructor(private services: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategory();
  }

  getProducts() {
    this.loading = true;
    this.services.getProducts().subscribe((res: any) => {
      this.products = res;
      this.loading = false;
      console.log(res);
    });
  }

  getStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    return new Array(fullStars).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return new Array(totalStars - fullStars - (hasHalfStar ? 1 : 0)).fill(0);
  }
  // Get Category
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
    value === 'All' ? this.getProducts() : this.getProductCategory(value);
  }
  // i wanna get all products and update my products array
  getProductCategory(val: string) {
    this.loading = true;
    this.services.getProductsByCategory(val).subscribe((res: any) => {
      this.products = res;
      this.loading = false;
    });
  }

  // Cart
  AddToCart(id: any) {
    let product = this.products.find((val: any) => val.id === id);
    console.log(product);

    if (product) {
      if ('cart' in localStorage) {
        this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      } else {
        this.cartProducts = [];
      }

      let exists = this.cartProducts.find((item: any) => item.id === id);

      if (exists) {
        exists.quantity += 1; // Increment the quantity if the product already exists
        alert('Product quantity updated in the cart');
      } else {
        product.quantity = 1; // Set initial quantity to 1 if the product doesn't exist
        this.cartProducts.push(product);
        console.log('Product added to cart:', product);
      }

      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }
}
