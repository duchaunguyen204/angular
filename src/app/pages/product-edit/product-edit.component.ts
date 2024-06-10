import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {

productId! : string
route = inject(ActivatedRoute)
productService = inject(ProductsService)


editProductForm :  FormGroup = new FormGroup({
title : new FormControl('' ,[Validators.required,Validators.minLength(4)] ),
price : new FormControl('' ,[Validators.required,Validators.min(0)] ),
image : new FormControl('' ,[Validators.required] ),
description : new FormControl('' ,[] ),
category : new FormControl('' ,[Validators.required] )
})

constructor(private router : Router) {}


ngOnInit(){
this.route.params.subscribe((param) =>{
  this.productId = param['id']
  this.productService.getDeltail(param['id']).subscribe({
    next : (data) =>{
      this.editProductForm.patchValue(data)
    },
    error: (e) => {
      console.log(e);
      
    }
  })
})
}



handleEdit(){
  console.log(this.editProductForm.value);
  if (this.productId) {
    // Cập nhật sản phẩm với các thông tin đã chỉnh sửa
    this.productService.Edit(this.productId, this.editProductForm.value).subscribe({
      next: () => {
        console.log('Sản phẩm đã được cập nhật thành công');
        Swal.fire('Sửa sản phẩm thành công!', 'Complete.', 'success');
        this.router.navigate(['/admin/products/list']);
      },
      error: (error) => {
        console.error('Cập nhật sản phẩm thất bại', error);
        Swal.fire('Sửa sản phẩm thất bại!', 'Error.', 'error');
      }
    });
  } else {
    console.error('Product ID không tồn tại');
    Swal.fire('Sửa sản phẩm thất bại!', 'Product ID không tồn tại.', 'error');
  }
  
}
}

