import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../types/Products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
apiUrl = `http://localhost:3000/products`

http = inject(HttpClient)

getAll() {
  return this.http.get<Product[]>(this.apiUrl)
}
getDeltail(id :string) {
  return this.http.get(`${this.apiUrl}/${id}`)
}
Add(data : any) {
  return this.http.post(this.apiUrl , data)
}
Edit(id: string , data: any) {
  return this.http.get(`${this.apiUrl}/${id}`, data)
}
Delete(id : string) {
  return this.http.delete(`${this.apiUrl}/${id}`)
}
Register() {
  return this.http.get(this.apiUrl)
}
Login() {
  return this.http.get(this.apiUrl)
}

  constructor() { }


}
