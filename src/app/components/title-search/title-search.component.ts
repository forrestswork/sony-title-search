import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Title} from '../../store/title/title.interfaces';
import {FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app';
import {addTitle, loadMyTitles, loadTitles, setFilter, saveMyTitles} from '../../store/title/title.actions';
import {
  selectFilteredTitles,
  selectMyTitles, selectMyTitlesDirty,
  selectTitles
} from '../../store/title/title.selectors';

@Component({
  selector: 'app-title-search',
  templateUrl: './title-search.component.html',
  styleUrls: ['./title-search.component.css']
})
export class TitleSearchComponent implements OnDestroy{
  public readonly titles$: Observable<Title[]>;
  public readonly filteredTitles$: Observable<Title[]>;
  public readonly search = new FormControl('');

  private sub: Subscription;

  // todo disable save button if its not dirty
  // todo don't show items in the autocomplete if they are already in the saved list
  constructor(private snackbar: MatSnackBar, private store: Store<AppState>) {
    store.dispatch(loadTitles());
    this.titles$ = store.select(selectTitles);
    this.filteredTitles$ = store.select(selectFilteredTitles);

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

  saveMyTitles() {
    this.store.dispatch(saveMyTitles());
    // todo make this actually check to see if it did save
    this.snackbar.open(`You successfully saved your list!`);
  }

  resetFilter() {
    this.search.setValue(null);
  }
}
