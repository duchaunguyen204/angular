import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../types/Products';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor,RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  productsService = inject(ProductsService);
  products: Product[] = [];

  ngOnInit() {
    this.productsService.getAll().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  constructor(private router: Router) {}

  handleDelete(id: string) {
    const confirm = window.confirm('Are you sure');
    if (confirm) {
      this.productsService.Delete(id).subscribe({
        next: () => {
          this.products = this.products.filter((product) => product.id !== id);
          alert('Delete Complete');
          this.router.navigate(['/']);
        },
      });
    } else {
      alert('Delete Fail');
    }
  }
}
