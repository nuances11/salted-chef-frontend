import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Chef } from 'src/app/chef';
import { ChefService } from 'src/app/service/shared/chef.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {
  @ViewChild('agGrid') agGrid?: AgGridAngular;

  chefs?: Chef;
  chef_type: string = 'current_chef';
  api?:any;
  columnApi? : any;

  columnDefs = [
    { headerName: 'Job', field: 'job', sortable: true, filter: true },
    { headerName: 'City', field: 'city', sortable: true, filter: true },
    { headerName: 'State',field: 'state', sortable: true, filter: true },
    { headerName: 'Apply Date',field: 'apply_date', sortable: true, filter: true },
    { headerName: 'Name',field: 'name', sortable: true, filter: true },
    { headerName: 'Email',field: 'email', sortable: true, filter: true },
    { headerName: 'Phone Number',field: 'phone_number', sortable: true, filter: true },
    { headerName: 'Status',field: 'status', sortable: true, filter: true },
    { headerName: 'Candidate Overview',field: 'candidate_overview', sortable: true, filter: true },
    { headerName: 'Resume',field: 'resume', sortable: true, filter: true }
  ];

  constructor(public chefService: ChefService) { }

  ngOnInit(): void {
    this.chefService.getChefs(this.chef_type).subscribe((data:any) => {
      this.chefs = data;
    })
  }

  onCellClicked = (params: any) => {
    console.log('Cell Clicked')
  }

  onGridReady = (params: any) => {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }

  onRowClicked = (params: any) => {

  }

}
