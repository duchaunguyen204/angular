import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../types/Users';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:3000';
  http = inject(HttpClient);

  register(data: User) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
}

