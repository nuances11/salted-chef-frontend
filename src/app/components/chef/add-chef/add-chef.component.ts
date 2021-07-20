import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Chef } from 'src/app/chef';
import { ChefService } from 'src/app/service/shared/chef.service';
import { ResultsService } from 'src/app/service/shared/results.service';

@Component({
  selector: 'app-add-chef',
  templateUrl: './add-chef.component.html',
  styleUrls: ['./add-chef.component.scss']
})
export class AddChefComponent implements OnInit {

  model?: NgbDateStruct;
  public inputForm: FormGroup;
  public chef?: Chef;

  constructor(
    private resultService: ResultsService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private chefService: ChefService,
    private router: Router) {

    this.inputForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      apply_date: [this.getTodayDate(this.model), Validators.required],
      phone_number: ['', Validators.required],
      status: ['No Status'],
      labels: [''],
      job: ['Personal Chef'],
      rating: [''],
      do_not_contact: ['0'],
      candidate_overview: [''],
      resume: [''],
      chef_type: ['chef_to_screen'],
      items: this.formBuilder.array([
        this.addNotesFormGroup()
      ])
    });
  }

  ngOnInit(): void {
  }

  getTodayDate(model: any) {
    var dd = '';
    var mm = '';
    var yyyy = '';
    var today = new Date();

    if (!model) {

      dd = String(today.getDate()).padStart(2, '0');
      mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      yyyy = String(today.getFullYear());
    }else{
      dd = String(model.day);
      mm = String(model.month);
      yyyy = String(model.year);
    }


    return mm + '/' + dd + '/' + yyyy;
  }

  onSubmit() {

    this.inputForm?.patchValue({
      apply_date : this.getTodayDate(this.model)
    })
    console.log(this.inputForm);
    // stop here if form is invalid
    if (this.inputForm.valid) {
      console.log(this.model);
      console.log(this.inputForm.value);

      this.chefService.upload(this.inputForm.value).subscribe(res => {
        console.log(res)
        if (res.success) {
          alert(res.message)
          this.inputForm.reset();
        }else{
          alert(res.message)
        }
      })

    }
  }

  removeItem(i: any) {
    (<FormArray>this.inputForm?.get('items')).removeAt(i);
  }

  addNotes(): void {
    (<FormArray>this.inputForm?.get('items')).push(this.addNotesFormGroup());
  }

  addNotesFormGroup(): FormGroup {
    return this.formBuilder.group({
      notes: ['']
    })
  }

  get userFormGroups () {
    return this.inputForm.get('items') as FormArray
  }

}
