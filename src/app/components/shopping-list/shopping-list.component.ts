import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService
    .getProducts()
    .subscribe((data: Product[]) => {
      this.products = data;
      console.log('Data requested ... ');
      console.log(this.products);
    });
  }

  editProduct(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.fetchProducts();
    });
  }

  addToCart(product: Product) {
    product.onCart = !product.onCart;
  }
}
