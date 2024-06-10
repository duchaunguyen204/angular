import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../types/Users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:3000';
  http = inject(HttpClient);

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data:any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getUserAll(){
    return this.http.get<User[]>(`${this.apiUrl}/users`)
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
