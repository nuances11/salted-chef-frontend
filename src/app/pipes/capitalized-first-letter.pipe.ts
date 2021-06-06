import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizedFirstLetter'
})
export class CapitalizedFirstLetterPipe implements PipeTransform {

  transform(value: any): any {
    console.log(value.split());
  }

}
