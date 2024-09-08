import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { ProductsManagementService } from './Services/products-management.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlValidatorComponent } from '../../shared/components/control-validator/control-validator.component';

const standAloneComponents=[
  ControlValidatorComponent
]

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...standAloneComponents
    
  ],
  providers:[
    ProductsManagementService
  ]
})
export class ProductManagementModule { }
