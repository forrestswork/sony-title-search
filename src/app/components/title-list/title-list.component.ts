import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Title} from '../../store/title/title.interfaces';
import {Observable, Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app';
import {addTitle, loadMyTitles, loadTitles, setFilter, saveMyTitles, removeTitle} from '../../store/title/title.actions';
import {
  selectFilteredTitles,
  selectMyTitles, selectMyTitlesDirty,
  selectTitles
} from '../../store/title/title.selectors';

@Component({
  selector: 'app-title-list',
  templateUrl: './title-list.component.html',
  styleUrls: ['./title-list.component.css']
})
export class TitleListComponent {
  public readonly myTitles$: Observable<Title[]>;

  constructor(private snackbar: MatSnackBar, private store: Store<AppState>) {
    store.dispatch(loadMyTitles());
    this.myTitles$ = store.select(selectMyTitles);
  }

  removeTitle(title: Title) {
    this.snackbar.open(`You removed ${title.name} from your list!`);
    this.store.dispatch(removeTitle({id: title.id}))
  }
}
