import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../types/Products';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

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
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    image: new FormControl('', []),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });


  constructor(private router: Router) {}

  handleSubmit() {
 
    console.log(this.addForm);
    this.productsService.Add(this.addForm.value).subscribe({
      next: () => {
      
        Swal.fire(`Thêm sản phẩm thành công!`, `Trở về trang chủ nào !!`, 'success');
        this.router.navigate(['/admin/products/list']);
      },
      error: (error) => {
        // show error
        console.error(error.message);
      },
    });
  }
}
