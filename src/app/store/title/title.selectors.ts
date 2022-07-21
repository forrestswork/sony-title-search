import { createSelector } from '@ngrx/store';
import {AppState} from '../app';
import {TitleState} from './title.interfaces';

export const selectTitleState = (state: AppState) => state.title;

export const selectTitles = createSelector(
  selectTitleState,
  (state: TitleState) => [...state.titles]
);

export const selectFilteredTitles = createSelector(
  selectTitleState,
  (state: TitleState) => {
    const {titles, myTitles, filter} = state;
    const filteredTitles = titles
      // filter any titles that are already in the list
      .filter(t => ! myTitles.find(mt => mt.id === t.id))
      // if filter is set then filter titles that don't include the filter
      .filter(t => filter ? t.full_name.toLowerCase().includes(filter) : true)
    return [...filteredTitles];
  }
);

export const selectMyTitles = createSelector(
  selectTitleState,
  (state: TitleState) => {
    return [...state.myTitles];
  }
);

export const selectMyTitlesDirty = createSelector(
  selectTitleState,
  (state: TitleState) => state.dirty
);
