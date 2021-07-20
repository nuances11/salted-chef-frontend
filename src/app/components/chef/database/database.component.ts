import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbDate, NgbDatepicker, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community';
import { Chef } from 'src/app/chef';
import { ChefService } from 'src/app/service/shared/chef.service';
import { ResultsService } from 'src/app/service/shared/results.service';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {
  @ViewChild('agGrid') agGrid?: AgGridAngular;
  @ViewChild('modalData') modalData?: NgbModal;

  public model?: NgbDateStruct;
  public inputForm: FormGroup;
  public chefs?: Chef;
  public chef?: Chef;
  chef_type: string = 'chef_to_screen';
  api?:any;
  columnApi? : any;
  gridOptions? : any;
  public items?: FormArray;
  public chef_name?: string;
  public showModal: boolean = false;
  public client_name?: string = '';
  public closeModal?: string;
  public showActionBtn? : boolean = false;
  private node_index?: any;
  private node_data?: any;
  private node_distance?: any;
  private column_defs: any;

  columnDefs =  [
    { headerName: 'Name',field: 'name', sortable: true, filter: true,},
    { headerName: 'City', field: 'city', sortable: true, filter: true },
    { headerName: 'State',field: 'state', sortable: true, filter: true },
    { headerName: 'Apply Date',field: 'apply_date', sortable: true, filter: true },
    { headerName: 'Email',field: 'email', sortable: true, filter: true },
    { headerName: 'Phone Number',field: 'phone_number', sortable: false, filter: true },
    { headerName: 'Status',field: 'status', sortable: false, filter: false },
    { headerName: 'Job', field: 'job', sortable: true, filter: true },
    { headerName: 'Candidate Overview',
      cellRenderer: function(params: any) {
        let linkData = params.data.candidate_overview;
        let newLink =
        `<a href= ${linkData}
        target="_blank">Click to view</a>`;
        return newLink;
    }, sortable: false, filter: false },
    { headerName: 'Resume',field: 'resume',
      cellRenderer: function(params: any) {
        let linkData = params.data.resume;
        let newLink =
        `<a href= ${linkData}
        target="_blank">Click to view</a>`;
        return newLink;
      }, sortable: false, filter: false
    }
  ];

  constructor(
    private resultService: ResultsService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private chefService: ChefService,
    private router: Router
    ) {

    this.inputForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      apply_date: [this.getTodayDate(this.model), Validators.required],
      phone_number: ['', Validators.required],
      status: ['', Validators.required],
      labels: [''],
      rating: [''],
      chef_type: [''],
      job: [''],
      do_not_contact: [''],
      ndidate_overview: [''],
      resume: [''],
      items: this.formBuilder.array([
        this.addNotesFormGroup()
      ])
    });
  }

  ngOnInit(): void {

    this.chefService.getChefs(this.chef_type).subscribe((data:any) => {
      this.chefs = data;
    })

    this.gridOptions = <GridOptions>{
      // PROPERTIES
      rowSelection: 'single',

      // EVENTS
      // Add event handlers
      onGridReady: this.onGridReady.bind(this),
      rowClassRules : {
        // row style function
        'not-recommended': function (params) {
          return params.node.data.status === 'Not Recommended';
        }
      },
      getRowStyle : function (params : any) {
        if (params.data.status === 'Not Recommended') {
            return { background: 'lightcoral' };
        }else{
          return { background: 'inherit' };
        }
      }

    }

  }

  formatedDate(model: any) {
    var dd = String(model.day);
    var mm = String(model.month);
    var yyyy = String(model.year);

    var formatedDate = mm + '/' + dd + '/' + yyyy;

    return formatedDate;
  }

  getDefaultDate() {
    var date = new Date();
    var ngbDateStruct = { day: date.getUTCDay(), month: date.getUTCMonth(), year: date.getUTCFullYear()};
    // this.model = ngbDateStruct;
    return this.model;
  }

  getTodayDate(model: any): NgbDateStruct {
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


    // return mm + '/' + dd + '/' + yyyy;
    return {
      year : parseInt(yyyy),
      day : parseInt(dd),
      month : parseInt(mm),
    }
  }

  removeItem(i: any) {
    (<FormArray>this.inputForm?.get('items')).removeAt(i);
  }

  linkFormatter (params: any){
    return `<a href=${params.value} target="_blank">Visit</a>`;
  }

  onCellClicked = (params: any) => {
    console.log('Cell Clicked')
  }

  onGridReady = (params: any) => {
    console.log(params);
    this.api = params.api;
    this.columnApi = params.columnApi;
  }

  changeDate(event: any) {
    console.log('changeDate', this.getTodayDate(event));
    this.model = this.getTodayDate(event);
    console.log('changeDate', this.model);
  }

  onRowClicked = (params: any) => {
    console.log('clicked')

    this.node_index = params.rowIndex;

    this.chef = params.data;
    this.chef_name = params.data.name;
    this.node_distance = params.data.distance;
    console.log(params.data);
    // var newDate = params.data.apply_date.split('/').reverse().join('/');
    var newDate = params.data.apply_date.split('/').reverse();
    var year = parseInt(newDate[0]);
    var day = parseInt(newDate[2]);
    var month = parseInt(newDate[1]);
    newDate = {year : year, month: month, day: day};
    // this.model = {year : year, month: month, day: day};
    this.model = this.getTodayDate(newDate);
    this.formatedDate(newDate)
    console.log(newDate);
    console.log(this.model);

    this.inputForm?.patchValue({
      id: params.data.id,
      chef_type: params.data.chef_type,
      // apply_date: this.getTodayDate(params.data.apply_date),
      name: params.data.name,
      job: params.data.job,
      city: params.data.city,
      state: params.data.state,
      phone_number: params.data.phone_number,
      status: params.data.status,
      labels: params.data.labels,
      rating: params.data.rating,
      do_not_contact: params.data.do_not_contact,
    })

    var notesArr;
    const notesStr = params.data.notes;
    if (notesStr) {
      notesArr = notesStr.split('; ');
    }else {
      notesArr = [];
    }

    this.inputForm?.setControl('items', this.setExistingItems(notesArr));
    this.showModal = true;
    this.triggerModal(this.modalData);
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.inputForm.valid) {
      console.log(this.model);

      this.inputForm?.patchValue({
        apply_date : this.formatedDate(this.model)
      })
      console.log(this.inputForm.value.apply_date);
      console.log(this.inputForm.value);

      this.chefService.updateChef({data:this.inputForm.value}).subscribe((res : any) => {
        if (res.success) {
          var rowNode = this.api.getRowNode(this.node_index);
          rowNode.setData(res.updated);
          // rowNode.setDataValue('distance', this.node_distance);
          // this.api.redrawRows();
          // this.api.refreshCells()
          alert('Chef Updated successfully!');
        }
      })

    }
  }

  addNotes(): void {
    (<FormArray>this.inputForm?.get('items')).push(this.addNotesFormGroup());
  }

  get userFormGroups () {
    return this.inputForm.get('items') as FormArray
  }

  setExistingItems(notes: Array<any>): FormArray {
    const formArray = new FormArray([]);
    if (notes.length > 1) {
      notes.forEach(element => {
        formArray.push(this.formBuilder.group({
          notes: element
        }))
      });
    }else{
      formArray.push(this.addNotesFormGroup())
    }

    return formArray;
  }

  addNotesFormGroup(): FormGroup {
    return this.formBuilder.group({
      notes: ['']
    })
  }

  triggerModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-xl'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      this.showModal = false;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
