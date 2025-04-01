import { Component, effect, inject, input, output } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { User, UserForm } from '../../interface/user-form.interface';
import { DatePipe, JsonPipe, NgIf } from '@angular/common';
import FormUtils from '../../form-utils/form-utils';
import { ErrorComponent } from '../error/error.component';


@Component({
  selector: 'form-template',
  imports: [ReactiveFormsModule, DatePipe, ErrorComponent],
  templateUrl: './form.component.html',
})
export class FormComponent {
  fb = inject(FormBuilder)
  formUtils = FormUtils


  todayDate = this.formUtils.currentDay


  isUpdatingUser = input.required<boolean>()
  currentUser = input.required<UserForm>()
  isLoadingRandomUser = input.required<boolean>()
  userList = input<User[]>([])




  newUser = output<UserForm>()
  updatedUser = output<UserForm>()


  clickEvent = output()

  myForm : FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    gender: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern), this.formUtils.notAllowedEmail(() => this.userList(),()=> this.isUpdatingUser())]],
    birthday: [null, Validators.required]
  })


  onSubmit(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched()
      return
    }

    if (this.isUpdatingUser()){
      this.updatedUser.emit(this.myForm.value)
      this.myForm.reset()
      return
    }
    this.newUser.emit(this.myForm.value)

    this.myForm.reset()
  }


  putRandomUser(){

    this.clickEvent.emit()

  }

  fillForm = effect(() => {
    this.myForm.patchValue(this.currentUser())
  })
 }
