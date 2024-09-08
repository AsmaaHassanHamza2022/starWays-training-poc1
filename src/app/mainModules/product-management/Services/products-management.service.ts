import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { IProduct } from '../utilities/models/product';

@Injectable()
export class ProductsManagementService {
  apisBasePath = 'public/staticData';
  productsList: IProduct[] = [];

  constructor(private http: HttpClient) {}

  getCategories(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apisBasePath}/categories`);
  }
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apisBasePath}/products`).pipe(
      tap((res) => {
        debugger;
        if (res.length) {
          this.productsList = res;
        }
      })
    );
  }

  getProductById(productId: string): Observable<IProduct | null> {
    const targetProduct = this.productsList?.find(
      (product) => product.id === productId
    );
    if (!!targetProduct) {
      return of(targetProduct);
    }
    return of(null);
  }

  addNewProduct(product: IProduct) {
    this.productsList.push(product);
  }

  updateProduct(product: IProduct, productId: string) {
    const updatedProductIndex = this.productsList.findIndex(
      (product) => product.id === productId
    );
    if (updatedProductIndex > -1) {
      this.productsList[updatedProductIndex] = product;
    }
  }

  deleteProduct(productId: string) {
    const deletedProductIndex = this.productsList.findIndex(
      (product) => product.id === productId
    );
    if (deletedProductIndex > -1) {
      this.productsList.splice(deletedProductIndex, 1);
    }
  }
}
