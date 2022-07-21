import {Title, TitleState} from './title.interfaces';
import {ActionCreatorProps, createReducer, on} from '@ngrx/store';
import {
  addTitle,
  setFilter,
  setTitles,
  removeTitle,
  markAsPristine,
  setMyTitles
} from './title.actions';

export const initialState: TitleState = {
  titles: [],
  myTitles: [],
  filter: null,
  dirty: false
};

export const titleReducer = createReducer(
  initialState,
  on(setTitles, (state, {titles}) => {
    return {...state, titles};
  }),
  on(setFilter, (state, {filter}) => {
    const cleanFilter = filter?.toLowerCase().trim();
    // the minimum filter length is 3 characters
    const newFilter = (cleanFilter && cleanFilter.length >= 3) ? cleanFilter : null;
    return {...state, filter: newFilter};
  }),
  on(setMyTitles, (state, {titles}) => {
    return {...state, myTitles: [...titles]};
  }),
  on(addTitle, (state, {id}) => {
    const {myTitles, titles} = state;
    // if the title already exists don't add it again
    if (myTitles.find(t => t.id === id)) {
      return {...state};
    }
    const newList = [...myTitles];

    // todo handle error if the title is not found
    const title = titles.find(title => title.id === id);
    if (title) {
      newList.push(title);
    }

    return {...state, myTitles: newList, dirty: true};
  }),
  on(removeTitle, (state, {id}) => {
    const {myTitles} = state;
    const newList = myTitles.filter(title => title.id !== id);
    return {...state, myTitles: newList, dirty: true};
  }),
  on(markAsPristine, (state) => ({...state, dirty: false})),
)


