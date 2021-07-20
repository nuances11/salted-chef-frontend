import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community';
import { each } from 'jquery';
import { Chef } from 'src/app/chef';
import { ChefService } from 'src/app/service/shared/chef.service';
import { ResultsService } from 'src/app/service/shared/results.service';
import { ZipCodeService } from 'src/app/service/zip-code.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  @ViewChild('agGridagGridCurrentChef') agGridagGridCurrentChef?: AgGridAngular;
  @ViewChild('agGridChefToScreen') agGridChefToScreen?: AgGridAngular;
  @ViewChild('modalData') modalData?: NgbModal;

  public inputForm: FormGroup;
  public chef?: Chef;
  public result?: any;
  public current_chef?: Chef;
  public chef_to_screen?: Chef;
  public client_name?: string = '';
  public closeModal?: string;
  public showActionBtn? : boolean = false;
  private node_index?: any;
  private node_data?: any;
  private node_distance?: any;

  public items?: FormArray;
  public chef_name?: string;
  public showModal: boolean = false;
  public currentChefGridOptions: any;
  public chefToScreenGridOptions: any;
  public currentChefApi: any;
  public chefToScreenApi: any;
  public chefToScreenColumnApi: any;
  public currentChefColumnApi: any;
  public api: any;
  private column_defs: any;
  private chef_type?: any;
  private selected_zipcode?: any;

  current_chef_columnDefs = [
    { headerName: 'Name',field: 'name', sortable: true, filter: true,},
    { headerName: 'Distance', field: 'distance', sortable: true, filter: true },
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

  chef_to_screen_columnDefs = [
    { headerName: 'Name',field: 'name', sortable: true, filter: true,},
    { headerName: 'Distance', field: 'distance', sortable: true, filter: true },
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
    private router: Router,
    private zipCodeService: ZipCodeService) {

    this.initResult();

    this.inputForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      phone_number: ['', Validators.required],
      status: [''],
      labels: [''],
      rating: [''],
      do_not_contact: [''],
      items: this.formBuilder.array([
        this.addNotesFormGroup()
      ])
    });
  }

  ngOnInit(): void {

    this.currentChefGridOptions = <GridOptions>{
      // PROPERTIES
      rowSelection: 'single',

      // EVENTS
      // Add event handlers
      onGridReady: this.currentChefGridReady.bind(this),

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

    this.chefToScreenGridOptions = <GridOptions>{
      // PROPERTIES
      rowSelection: 'single',

      // EVENTS
      // Add event handlers
      onGridReady: this.chefToScreenGridReady.bind(this),

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

  initResult() {
    this.result = this.resultService.getResult();
    if (this.result) {
      this.chef_to_screen = (this.result[0].chef_to_screen) ? this.result[0].chef_to_screen : '';
      this.current_chef = (this.result[0].current_chef) ? this.result[0].current_chef : '';
      this.client_name = (this.result[0].name) ? this.result[0].name : '';
      this.selected_zipcode = (this.result[0].code) ? this.result[0].code : '';
    }else{
      this.router.navigate(['/zipcode/input'])
    }
  }

  updateResult() {
    this.result = this.resultService.getResult();
  }

  removeItem(i: any) {
    (<FormArray>this.inputForm?.get('items')).removeAt(i);
  }

  linkFormatter (params: any){
    return `<a href=${params.value} target="_blank">Visit</a>`;
  }

  onCurrentChefCellClicked = (params: any) => {
    console.log('Cell Clicked')
  }

  onChefToScreenCellClicked = (params: any) => {
    console.log('Cell Clicked')
  }

  currentChefGridReady = (params: any) => {
    this.currentChefApi = params.api;
    this.currentChefColumnApi = params.columnApi;
  }

  chefToScreenGridReady = (params: any) => {
    this.chefToScreenApi = params.api;
    this.chefToScreenColumnApi = params.columnApi;
  }

  onCurrentChefRowClicked = (params: any) => {
    this.chef_type = 'current_chef';
    this.node_index = params.rowIndex;
    this.api = this.currentChefApi;

    this.chef = params.data;
    this.chef_name = params.data.name;
    this.node_distance = params.data.distance;
    this.column_defs = this.current_chef_columnDefs;

    this.inputForm?.patchValue({
      id: params.data.id,
      name: params.data.name,
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

  onChefToScreenRowClicked = (params: any) => {
    this.chef_type = 'chef_to_screen';
    this.node_index = params.rowIndex;
    this.api = this.chefToScreenApi;

    this.chef = params.data;
    this.chef_name = params.data.name;
    this.node_distance = params.data.distance;
    this.column_defs = this.chef_to_screen_columnDefs;

    this.inputForm?.patchValue({
      id: params.data.id,
      name: params.data.name,
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

      this.chefService.updateChef({data:this.inputForm.value}).subscribe((res : any) => {
        if (res.success) {
          var rowNode = this.api.getRowNode(this.node_index);
          rowNode.setData(res.updated);
          rowNode.setDataValue('distance', this.node_distance);
          this.api.redrawRows();
          this.api.setColumnDefs(this.column_defs);
          this.api.refreshClientSideRowModel();
          this.updateResultData(res.updated, this.chef_type);
          alert('Chef Updated successfully!');
        }
      })

    }


  }

  updateResultData(data: any, type: string) {
    var zipcodes: Array<any> = [];

    this.result.forEach((element : any) => {
      zipcodes.push({
        zipcode : element.code,
        clients_name : element.name
      })
    });

    this.zipCodeService.getCode({data : zipcodes}).subscribe(res => {
        this.resultService.setResult(res);
        this.updateResult()
        console.log(this.selected_zipcode);
        this.onChangeResult(this.selected_zipcode);
    })


    // this.result.forEach((element : any) => {
    //   console.log('Result Element', element)
    //   if (element.code === this.selected_zipcode) {
    //     console.log('Element Code', element.code);
    //     console.log('Matched Element', element)

    //     var itemArray = element[type];
    //     console.log('Matched Element Array', itemArray)
    //     var item = itemArray.find((e : any) => {

    //       if (e.id === data.id) {
    //         console.log('Matched Element Array Element', e);
    //         e = data;
    //         console.log('Updated Element', e)
    //       }
    //     })
    //   }
    // });


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

  onChangeResult = (code: any) => {
    console.log('onChangeResult code: ', code)
    this.result.forEach((element:any) => {
      if (code == element.code) {
        console.log(element);
        this.chef_to_screen = element.chef_to_screen;
        this.current_chef = element.current_chef;
        this.client_name = element.name;
        this.selected_zipcode = element.code;
      }
      console.log(this.chef_to_screen)
      console.log(this.current_chef)
      console.log(this.client_name)
      console.log(this.selected_zipcode)
    });
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
