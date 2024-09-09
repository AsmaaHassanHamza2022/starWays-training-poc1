import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent:()=>import('./pages/product-list/product-list.component'),
    pathMatch: 'full',
  },
  {
    path: 'add',
    loadComponent:()=>import('./pages/product-form/product-form.component')
    
  },
  {
    path: 'edit/:id',
    loadComponent:()=>import('./pages/product-form/product-form.component')
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductManagementRoutingModule {}
