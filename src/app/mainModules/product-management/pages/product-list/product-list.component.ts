import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductsManagementService } from '../../Services/products-management.service';
import { ICategory } from '../../utilities/models/category';
import { IProduct } from '../../utilities/models/product';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from '../../components/filters/filters.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone:true,
  imports:[CommonModule,FiltersComponent,RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductListComponent implements OnInit {
  categoriesList: ICategory[] = [];
  selectedCategory: string = '';
  constructor(public productManagementService: ProductsManagementService) {}

  ngOnInit(): void {
    this.getLookup();
    this.getData();
  }
  ngAfterViewChecked() {
    console.log('ProductListComponent View Checked');
  }
  getLookup() {
    this.productManagementService.getCategories().subscribe({
      next: (res) => {
        this.categoriesList = res;
      },
    });
  }
  getData() {
    this.productManagementService.getProducts().subscribe();
  }

  onSearch(event: Event) {
    const searchKey = (event.target as HTMLInputElement).value;
    this.productManagementService.searchOnProducts(searchKey);
  }
  onFilterByCategory(event: Event) {
    const categoryId = (event.target as HTMLSelectElement).value;
    this.selectedCategory = categoryId;
    this.productManagementService.filterProductsBasedOnCategory(categoryId);
  }
  onClearFilter() {
    this.selectedCategory = '';
    this.productManagementService.filterProductsBasedOnCategory('');
  }

  onDelete(product: IProduct, index: number) {
    const isActionConfirmed = window.confirm(
      `Are You sure You Want to delete ${product.name} product ?`
    );
    if (isActionConfirmed) {
      this.productManagementService.deleteProduct(index).subscribe();
    }
  }
}
