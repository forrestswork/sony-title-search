import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleListComponent } from './title-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    TitleListComponent
  ],
  exports: [
    TitleListComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
  ]
})
export class TitleListModule { }
