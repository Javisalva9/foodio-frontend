import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  products: Product[];
  productsOnCart: Product[];
  addForm: FormGroup;

  constructor(private productService: ProductService, private formBuilder: FormBuilder, private router: Router) {
    this.addForm = this.formBuilder.group({
      productName: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.fetchProducts();
    this.productsOnCart = [];
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

  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.fetchProducts();
    });
  }

  addProduct(productName) {
    this.productService.addProduct(productName).subscribe(() => {
      this.fetchProducts();
    });
  }

  addToCart(product: Product) {
    this.productsOnCart.push(product)
    this.products.splice(this.products.indexOf(product), 1)
  }

  removeFromCart(product: Product) {
    this.products.push(product)
    this.productsOnCart.splice(this.productsOnCart.indexOf(product), 1)
  }

  shop(shopItems:Product[]) {
    shopItems.forEach(product => {
      this.productsOnCart = []
      this.deleteProduct(product._id)
    });
  }

}
