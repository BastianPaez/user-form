import { Component, inject, signal } from '@angular/core';
import { FormComponent } from "../../components/form/form.component";
import { UserListComponent } from "../../components/user-list/user-list.component";
import { UserFormService } from '../../services/user-form.service';
@Component({
  selector: 'register-user',
  imports: [FormComponent, UserListComponent],
  templateUrl: './register-user.component.html'
})
export class UserFormComponent {

  userFormService = inject(UserFormService)



  getRandomUser(){
    this.userFormService.getRandomUser().pipe(
    ).subscribe()
  }
 }
