import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ZipcodeRangeDirective } from 'src/app/directives/zipcode-range.directive';
import { AuthService } from 'src/app/service/shared/auth.service';
import { PageService } from 'src/app/service/shared/page.service';
import { ResultsService } from 'src/app/service/shared/results.service';
import { ZipCodeService } from 'src/app/service/zip-code.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  inputForm: FormGroup;
  items?: FormArray;
  inputNum: number = 1;
  hasErrors: boolean = false;
  resultArr: Array<any> = [];
  has_errors: boolean = false;
  user?: User;
  hasSearchError: boolean = false;
  searchErrorString: string = '';
  loading?: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private zipCodeService: ZipCodeService,
    private router: Router,
    private resultService: ResultsService,
    private authService: AuthService,
    private pageMeta: PageService
    ) {
      this.inputForm = this.formBuilder.group({
        items: this.formBuilder.array([ this.createItem() ])
      });

      this.authService.profileUser().subscribe((data:any) => {
        this.user = data;
      })

      this.pageMeta.setMeta({
        title: 'Main',
        description: 'Zipcode Input'
      })
    }

  ngOnInit(): void {
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      zipcode: [null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(5)
        ]
      ],
      clients_name: [null,
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ]
    });
  }

  addItem(): void {
    this.inputNum++;
    this.items = this.userFormGroups;
    this.items.push(this.createItem());
  }

  removeItem(i: any) {
    this.userFormGroups.removeAt(i);
  }

  maxInput() {
    return this.inputNum < 20;
  }

  get userFormGroups () {
    return this.inputForm.get('items') as FormArray
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.inputForm.valid) {
      this.loading = true;
      this.hasErrors = false;
      this.resultArr = [];
      this.inputForm.value.items.forEach((elements: any) => {

        this.resultArr.push(elements)
      });

      this.zipCodeService.getCode({data : this.resultArr}).subscribe(res => {

        if (res.Error) {
          this.hasSearchError = true;
          this.searchErrorString = res.Error;
          this.loading = false;
        }else{
          this.loading = false;
          this.resultService.setResult(res);
          this.router.navigate(['zipcode/result'])
        }

      })

    } else {
      this.validateAllFormFields(this.inputForm);
      this.hasErrors = true;
    }


  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
