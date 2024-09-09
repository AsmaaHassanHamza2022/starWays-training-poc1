import { WritableSignal } from "@angular/core";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  categoryId: string;
  creationDate: string;
}

export interface IProductFilters{
  categoryId:WritableSignal<string>,
  searchKey:WritableSignal<string>
}