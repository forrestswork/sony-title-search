import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from './store/app';
import {
  addTitle, loadMyTitles,
  loadTitles,
  removeTitle,
  saveMyTitles,
  setFilter
} from './store/title/title.actions';
import {Observable, of, Subscription} from 'rxjs';
import {Title} from './store/title/title.interfaces';
import {
  selectFilteredTitles,
  selectMyTitles,
  selectMyTitlesDirty,
  selectTitles
} from './store/title/title.selectors';
import {FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
