import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../types/Products';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent {
  productsService = inject(ProductsService);
  products: Product[] = [];

  addForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });


  constructor(private router: Router) {}

  handleSubmit() {
    this.productsService.Add(this.addForm.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
        alert('Add Complete');
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
