import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app';
import {selectMyTitlesDirty} from '../../store/title/title.selectors';
import {
  addTitle, loadMyTitles,
  loadTitles,
  removeTitle,
  saveMyTitles,
  setFilter
} from '../../store/title/title.actions';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.css']
})
export class SaveButtonComponent {
  public readonly enableSave$: Observable<boolean>;
  constructor(private snackbar: MatSnackBar, private store: Store<AppState>) {
    this.enableSave$ = store.select(selectMyTitlesDirty);
  }

  saveMyTitles() {
    this.store.dispatch(saveMyTitles());
    // todo make this actually check to see if it did save
    this.snackbar.open(`You successfully saved your list!`);
  }
}
