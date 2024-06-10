import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './services/auth.guard';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { UserListComponent } from './pages/user-list/user-list.component';

export const routes: Routes = [
    {
        path : 'admin',
        component: SidebarComponent,
        canActivate: [AuthGuard],
        children: [
             
            {
                path : 'products/list',
                component: ProductListComponent,
            
            },
            {
                path : 'products/add',
                component: ProductAddComponent,
                
            },
            {
                path : 'products/edit/:id',
                component: ProductEditComponent,
                
            },
            {
                path : 'users/list',
                component: UserListComponent,
                
            },
        ]
    },
    
    {
        path : 'login',
        component: LoginComponent
    },
    {
        path : 'register',
        component: RegisterComponent
    }
];
