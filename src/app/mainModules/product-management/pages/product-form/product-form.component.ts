import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsManagementService } from '../../Services/products-management.service';
import { ICategory } from '../../utilities/models/category';
import { IProduct } from '../../utilities/models/product';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormModes } from '../../utilities/enums/enums';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  categoriesList: ICategory[] = [];
  public form!: FormGroup;
  formMode: FormModes = FormModes.Add;
  productId?: string;
  currentProductData?: IProduct;
  constructor(
    private fb: FormBuilder,
    private productManagementService: ProductsManagementService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.initForm();
    this.getLookup();
    this.checkMode();
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      price: ['', [Validators.required]],
      categoryId: [null, [Validators.required]],
    });
  }

  getLookup() {
    this.productManagementService.getCategories().subscribe({
      next: (res) => {
        this.categoriesList = res;
      },
    });
  }

  checkMode() {
    this.route.params.subscribe((prams: Params) => {
      if (!!prams['id']) {
        this.productId = prams['id'];
        this.formMode = FormModes.Edit;
        this.populateFormFields();
      } else {
        this.formMode = FormModes.Add;
      }
    });
  }

  populateFormFields() {
    if (!!this.productId) {
      this.productManagementService.getProductById(this.productId).subscribe({
        next: (res) => {
          if (res) {
            this.currentProductData = res;
            this.form.patchValue(res);
          }
        },
      });
    }
  }

  onAddNewProduct() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const path$ = this.isEditMode
      ? this.productManagementService.updateProduct(
          this.prepareDateForSending(),
          this.productId!
        )
      : this.productManagementService.addNewProduct(
          this.prepareDateForSending()
        );

    path$.subscribe({
      next: (res) => {
        if (res) {
          this.router.navigate(['/']);
        }
      },
    });
  }

  prepareDateForSending() {
    const newProductData: IProduct = {
      ...this.form.value,
      id: this.isEditMode
        ? this.productId
        : Math.random().toString(36).substr(2, 9) + Date.now().toString(36),
      category: this.categoriesList.find(
        (category) => category.id == this.form.get('categoryId')?.value
      )?.name,
      creationDate: new Date().toISOString().split('T')[0], // suppose this date change with update :)
    };

    return newProductData;
  }

  get isEditMode() {
    return this.formMode === FormModes.Edit;
  }
}
