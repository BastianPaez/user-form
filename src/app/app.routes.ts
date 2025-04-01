
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadComponent: () => import('./user-form/pages/register-user/register-user.component').then(m => m.UserFormComponent)
  }
];
