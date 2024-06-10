import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../types/Users';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  userService = inject(AuthService);
  users: User[] = [];

  trackById(index: number, user: User): string {
    return user.id;
  }
  ngOnInit() {
    this.userService.getUserAll().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  handleDelete(id: string) {
    const confirm = window.confirm("Are you sure")
    if (confirm) {
      this.userService.deleteUser(id).subscribe({
  
        next: () => {
          this.users = this.users.filter((user) => user.id !== id);
          alert("delete complete")
        },
        error: (e) => {
          console.log(e);
        },
      });
    }else{
      alert("Delete Fail,Try Again")
    }
   
  }
}
