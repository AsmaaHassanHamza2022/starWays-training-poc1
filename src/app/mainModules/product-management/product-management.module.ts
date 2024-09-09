import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductsManagementService } from './Services/products-management.service';

@NgModule({
  imports: [ProductManagementRoutingModule],
  providers: [ProductsManagementService],
})
export class ProductManagementModule {}
