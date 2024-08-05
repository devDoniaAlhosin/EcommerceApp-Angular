import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faStarHalf } from '@fortawesome/free-solid-svg-icons/faStarHalf';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons/faStar';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../service/products.service';
import { DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FontAwesomeModule, NgClass, NgIf, DecimalPipe, NgFor],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  faStar = faStar;
  faStarHalf = faStarHalf;
  faStarOutline = faStarOutline;
  userId!: number;
  data: any = {};

  constructor(
    private route: ActivatedRoute,
    private services: ProductsService
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.params['id'];
    console.log(this.userId);
    this.getProduct();
  }

  quantity: number = 1;

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getProduct() {
    this.services.getProductById(this.userId).subscribe(
      (res: any) => {
        console.log(res);
        this.data = res;
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }
  getStockStatus() {
    return this.data.stock > 0 ? 'in-stock' : 'out-of-stock';
  }
  getDiscountPercentage(): number {
    const { price, discountPercentage } = this.data;
    if (price && discountPercentage) {
      return discountPercentage;
    }
    return 0;
  }

  getDiscountedPrice(): number {
    const { price, discountPercentage } = this.data;
    if (price && discountPercentage) {
      return price - (price * discountPercentage) / 100;
    }
    return price;
  }
  filterByTag(tag: string) {
    console.log('Filter by tag:', tag);
  }
}
