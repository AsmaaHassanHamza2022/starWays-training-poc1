import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadChildren:()=>import('./mainModules/product-management/product-management.module').then((m)=>m.ProductManagementModule)
    }
];
