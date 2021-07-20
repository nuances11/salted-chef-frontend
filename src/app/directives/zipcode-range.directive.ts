import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appZipcodeRange]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ZipcodeRangeDirective,
    multi: true
  }]
})
export class ZipcodeRangeDirective implements Validator {
  @Input('appZipcodeRange') zipcodeRange = '';

  validate(control: AbstractControl): ValidationErrors | null {
    // return this.zipcodeRange ? zipcodeRangeValidator(new RegExp(this.zipcodeRange, 'i'))(control)
    //                           : null;

    return null;
  }

}
