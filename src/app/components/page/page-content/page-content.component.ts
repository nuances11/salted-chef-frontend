import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthStateService } from 'src/app/service/shared/auth-state.service';
import { PageService } from 'src/app/service/shared/page.service';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent implements OnInit {

  isSignedIn?: boolean;
  meta?: any;
  metaTitle?: any;
  metaDescription?: any;

  constructor(
    private auth: AuthStateService,
    public pageMeta: PageService,
    private activatedroute:ActivatedRoute) {

  }

  ngOnInit(): void {
    this.auth.userAuthState.subscribe(val => {
        this.isSignedIn = val;
    });

    this.activatedroute.data.subscribe(data => {
      this.meta = data;
      console.log(data);
    })

    this.meta = this.pageMeta.getMeta();
    this.metaTitle = this.meta?.title;
    this.metaDescription = this.meta?.description;
    console.log(this.metaTitle)
    console.log(this.metaDescription)
    console.log(this.meta)
  }

}
