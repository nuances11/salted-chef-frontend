import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
