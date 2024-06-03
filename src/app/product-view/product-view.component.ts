import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {
  productData: Array<Product> = [];

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (data: Array<Product>) => {
        this.productData = data;
      },
      (error) => {
        this.productData = [];
      }
    );
  }

  onAddProduct() {
    this.productService.addProduct().subscribe(
      (data: Product) => {
        this.productData.push(data);
      },
      (error) => {
        this.productData = [];
      }
    );
  }
}
