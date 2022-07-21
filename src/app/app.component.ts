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
export class AppComponent implements OnDestroy{
  public readonly titles$: Observable<Title[]>;
  public readonly filteredTitles$: Observable<Title[]>;
  public readonly myTitles$: Observable<Title[]>;
  public readonly enableSave$: Observable<boolean>;
  public readonly search = new FormControl('');

  private sub: Subscription;

  // todo disable save button if its not dirty
  // todo don't show items in the autocomplete if they are already in the saved list
  constructor(private snackbar: MatSnackBar, private store: Store<AppState>) {
    store.dispatch(loadTitles());
    store.dispatch(loadMyTitles());
    this.titles$ = store.select(selectTitles);
    this.myTitles$ = store.select(selectMyTitles);
    this.filteredTitles$ = store.select(selectFilteredTitles);
    this.enableSave$ = store.select(selectMyTitlesDirty);

    // todo discuss the best approach for this in the real world.
    // this can cause a ton of rewrites
    this.sub = this.search.valueChanges.subscribe(filter => store.dispatch(setFilter({filter})));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  selectTitle(title: Title) {
    this.snackbar.open(`You added ${title.name} to your list!`);
    this.search.setValue('');
    this.store.dispatch(addTitle({id: title.id}))
  }

  removeTitle(title: Title) {
    this.snackbar.open(`You removed ${title.name} from your list!`);
    this.store.dispatch(removeTitle({id: title.id}))
  }

  saveMyTitles() {
    this.store.dispatch(saveMyTitles());
    // todo make this actually check to see if it did save
    this.snackbar.open(`You successfully saved your list!`);
  }

  resetFilter() {
    this.search.setValue(null);
  }
}
