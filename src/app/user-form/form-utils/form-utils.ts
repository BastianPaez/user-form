import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { User } from '../interface/user-form.interface';


export default class FormUtils{

  static currentDay = new Date()

  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'




  static messageError(errors : ValidationErrors)  {

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required'

        case 'emailAlreadyExist':
          return 'The email already taken'
        case 'pattern':
          if(errors['pattern'].requiredPattern === FormUtils.emailPattern){
            return 'Email not valid'
          }
          return 'Error in pattern email'

        default:
          return `error not   controled '${key}'`
      }
    }
    return null

  }


  static isValidField( field : string, form : FormGroup) : boolean | null {
    return form.controls[field].errors && form.controls[field].touched
  }


  static notAllowedEmail( userList : () => User[], isUpdatingUser: () => boolean ) {
    return (email : AbstractControl) => {
      if(!email.value)  return null
      if(isUpdatingUser()) return null
      const emailExist = userList().some( item => item.email === email.value )
      return emailExist ? {emailAlreadyExist : true} : null
    }
  }


}
