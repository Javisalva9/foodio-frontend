import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // uri = 'http://localhost:4000';
  // uri = 'https://foodio-backend.herokuapp.com'
  apiUrl = environment.apiUrl
  constructor(private http: HttpClient) {
  }

  getProducts() {
    return this.http.get(`${this.apiUrl}/products/get`);
  }

  // getProductById(id) {
  //   return this.http.get(`${this.uri}/products/${id}`);
  // }

  addProduct(name, price = 0) {
    const product = {
      name: name,
      price: price
    };
    return this.http.post(`${this.apiUrl}/products/add`, product);
  }

  // updateProduct(id, title, responsible, description, severity, status) {
  //  const product = {
  //    title: title,
  //    responsible: responsible,
  //    description: description,
  //    severity: severity,
  //    status: status
  //  };
  //  return this.http.post(`${this.uri}/products/update/${id}`, product);
  // }

   deleteProduct(id) {
     return this.http.delete(`${this.apiUrl}/products/delete/${id}`);
   }
}
