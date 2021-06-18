import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { ChefService } from 'src/app/service/shared/chef.service';

@Component({
  selector: 'app-chef-upload',
  templateUrl: './chef-upload.component.html',
  styleUrls: ['./chef-upload.component.scss']
})
export class ChefUploadComponent implements OnInit {
  csvRecords: any = [];
  header = true;
  chef_type?: string = 'chef_to_screen';
  file?: File;
  loading?: boolean = false;

  replaceKeys: any = {
    "Job" : "job",
    "City" : "city",
    "State" : "state",
    "Apply Date" : "apply_date",
    "Name" : "name",
    "Email" : "email",
    "Phone Number" : "phone_number",
    "Rating" : "rating",
    "Status" : "status",
    "Notes" : "notes",
    "Labels" : "labels",
    "Candidate Overview" : "candidate_overview",
    "Resume" : "resume",
  }

  constructor(
    private ngxCsvParser: NgxCsvParser,
    private chefService: ChefService) { }

  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  ngOnInit(): void {
  }

  // Your applications input change listener for the CSV File
  fileChangeListener($event: any): void {

    // Select the files from the event
    this.file = $event.srcElement.files[0];

  }

  submitUpload() {
    // Parse the file you want to select for the operation along with the configuration
    if (this.file) {
      this.loading = true;
      this.ngxCsvParser.parse(this.file, { header: this.header, delimiter: ',' })
      .pipe().subscribe(result  => {
        this.csvRecords = result;

        if(this.chef_type) {
          this.processUploads(this.csvRecords, this.chef_type);
        }
        this.loading = false;
        alert('Chef Data uploaded successfully!');
        window.location.reload();
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
        this.loading = false;
      });

    }

  }

  processUploads(file: any, type: string) {
    const uploadObj: any = [];
    file.forEach((currentValue: any, index: any) => {
      currentValue["chef_type"] = type;
      uploadObj.push(currentValue);
    });
    this.chefService.upload({data:uploadObj}).subscribe(res => {
      return res
    })

  }

}
