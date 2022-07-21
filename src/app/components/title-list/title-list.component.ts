import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Title} from '../../store/title/title.interfaces';

@Component({
  selector: 'app-title-list',
  templateUrl: './title-list.component.html',
  styleUrls: ['./title-list.component.css']
})
export class TitleListComponent implements OnInit {
  @Input() titles: Title[] | null = [];
  @Output() removeTitle: EventEmitter<Title> = new EventEmitter<Title>();

  constructor() { }

  ngOnInit(): void {
  }

}
