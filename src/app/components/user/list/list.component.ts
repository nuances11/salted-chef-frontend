import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { RowClickedEvent } from 'ag-grid-community';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/service/shared/auth.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DatePipe]
})
export class ListComponent implements OnInit {
  @ViewChild('agGrid') agGrid?: AgGridAngular;

  data:any;
  users?: User;
  api?:any;
  columnApi? : any;
  showActionBtn? : boolean = false;
  selectedId?: any;
  selectedItem?: any;

  columnDefs = [
    { headerName: 'Name', field: 'full_name', sortable: true, filter: true, flex: 1 },
    { headerName: 'Email', field: 'email', sortable: true, filter: true, flex: 1 },
    { headerName: 'Role',field: 'role', sortable: true, filter: true, flex: 1 },
    { headerName: 'Account Created', valueGetter: this.getDate, sortable: true, flex: 1 }
  ];

  constructor(
    public authService: AuthService,
   ) { }

  ngOnInit(): void {
    this.authService.allUser().subscribe((data:any) => {
      this.users = data;
    })
  }

  getDate(params: any) {
    console.log(params);
    var datePipe = new DatePipe("en-US");
    var created_at = params.data.created_at;
    created_at = datePipe.transform(new Date(), 'MMM d, y');
    return created_at;
  }

  onCellClicked = (params: any) => {
    console.log('Cell Clicked')
    this.showActionBtn = true;
  }

  onGridReady = (params: any) => {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }

  onRowClicked = (params: any) => {

    this.authService.profileUser().subscribe((data:any) => {
      if (data.id == params.data.id) {
        this.showActionBtn = false;
        return false
      }else{
        this.showActionBtn = true;
        this.selectedId = params.data.id;
        this.selectedItem = params.data.full_name;
      }
      return false;
    })
  }

  getSelectedRows(): void {
    if (this.agGrid) {
      const selectedNodes = this.agGrid.api.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      const selectedDataStringPresentation = selectedData.map(node => `${node.full_name} ${node.email}`).join(', ');

      alert(`Selected nodes: ${selectedDataStringPresentation}`);
    }
  }

  cancelAction() {
    this.showActionBtn = false;
  }

  deleteUser(id:any) {
    this.authService.deleteUser(id).subscribe(res => {
      // this.getAllUser();
      alert(res.full_name + ' deleted!');
      console.log(res);
    });
  }

  isAdmin(id: any) {
    return id != 1;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event

  }

}
