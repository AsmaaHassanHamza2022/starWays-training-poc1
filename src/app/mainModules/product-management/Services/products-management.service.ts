import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, tap } from 'rxjs';
import { IProduct, IProductFilters } from '../utilities/models/product';
import { ICategory } from '../utilities/models/category';

@Injectable()
export class ProductsManagementService {
  apisBasePath = 'assets';

  private productsListSource: BehaviorSubject<IProduct[]> = new BehaviorSubject<
    IProduct[]
  >([]);
  private displayedProductsList: BehaviorSubject<IProduct[]> =
    new BehaviorSubject<IProduct[]>([]);
  productsList$ = this.displayedProductsList.asObservable();
  categoriesList$: BehaviorSubject<ICategory[]> = new BehaviorSubject<
    ICategory[]
  >([]);
  filters: IProductFilters = {
    searchKey: '',
    categoryId: '',
  };

  constructor(private http: HttpClient) {
    this.rehydrateDataFromLocalStorage();
  }

  getCategories(): Observable<ICategory[]> {
    if (!!this.categoriesList$.getValue()?.length) {
      return this.categoriesList$.asObservable();
    }
    return this.http
      .get<ICategory[]>(`${this.apisBasePath}/categories.json`)
      .pipe(
        tap((res) => {
          this.categoriesList$.next(res);
        })
      );
  }
  getProducts(): Observable<IProduct[]> {
    if (this.productsList?.length) {
      this.displayedProductsList.next(this.productsList);
      return of();
    }
    return this.http.get<IProduct[]>(`${this.apisBasePath}/products.json`).pipe(
      tap((res) => {
        if (res.length) {
          this.productsListSource.next(res);
          this.displayedProductsList.next(res);
          localStorage.setItem('Products', JSON.stringify(res));
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

  addNewProduct(product: IProduct): Observable<boolean> {
    const products = this.productsList;
    products.push(product);
    this.productsListSource.next(products);
    this.displayedProductsList.next(products);
    return of(true);
  }

  updateProduct(product: IProduct, productId: string): Observable<boolean> {
    const updatedProductIndex = this.productsList.findIndex(
      (product) => product.id === productId
    );
    if (updatedProductIndex > -1) {
      this.productsList[updatedProductIndex] = product;
      return of(true);
    }
    return of(false);
  }

  deleteProduct(productIndex: number): Observable<boolean> {
    this.productsList.splice(productIndex, 1);
    return of(true);
  }

  searchOnProducts(searchKey: string) {
    this.filters.searchKey = searchKey;
    if (!!searchKey) {
      const newList = this.filters.categoryId
        ? this.productsList.filter(
            (product) =>
              product.name
                .toLowerCase()
                .includes(searchKey.toLocaleLowerCase()) &&
              product.categoryId == this.filters.categoryId
          )
        : this.productsList.filter((product) =>
            product.name.toLowerCase().includes(searchKey.toLocaleLowerCase())
          );
      this.displayedProductsList.next(newList);
    } else {
      if (!this.filters.categoryId) {
        this.displayedProductsList.next(this.productsList);
      } else {
        this.filterProductsBasedOnCategory(this.filters.categoryId);
      }
    }
  }

  filterProductsBasedOnCategory(categoryId: string) {
    this.filters.categoryId = categoryId;
    if (!!categoryId) {
      const newList = this.filters.searchKey
        ? this.productsList.filter(
            (product) =>
              product.categoryId == categoryId &&
              product.name
                .toLowerCase()
                .includes(this.filters.searchKey.toLocaleLowerCase())
          )
        : this.productsList.filter(
            (product) => product.categoryId == categoryId
          );
      this.displayedProductsList.next(newList);
    } else {
      if (!this.filters.searchKey) {
        this.displayedProductsList.next(this.productsList);
      } else {
        this.searchOnProducts(this.filters.searchKey);
      }
    }
  }

  rehydrateDataFromLocalStorage() {
    if (!this.productsList.length) {
      this.productsListSource.next(
        JSON.parse(localStorage.getItem('Products')!)
      );
    }
  }

  get productsList() {
    return this.productsListSource.getValue()??[];
  }
}
