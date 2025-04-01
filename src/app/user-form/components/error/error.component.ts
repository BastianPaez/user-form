import { Component, input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import FormUtils from '../../form-utils/form-utils';
@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
})
export class ErrorComponent {

  formUtils = FormUtils

  fieldError = input.required<ValidationErrors>()


}
