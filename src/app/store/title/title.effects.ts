import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import * as TitleActions from './title.actions';
import {TitleService} from '../../services/title.service';
import {Store} from '@ngrx/store';
import {AppState} from '../app';
import {selectMyTitles} from './title.selectors';


@Injectable()
export class TitleEffects {

  loadTitles$ = createEffect(() => this.actions$.pipe(
    ofType(TitleActions.loadTitles),
    switchMap(action => this.titleService.getTitles().pipe(
      map(titles => TitleActions.setTitles({titles}))
    ))
  ));
  saveMyTitles$ = createEffect(() => this.actions$.pipe(
    ofType(TitleActions.saveMyTitles),
    withLatestFrom(this.store.select(selectMyTitles)),
    switchMap(([action, myTitles]) => this.titleService.saveMyTitles(myTitles).pipe(
      map(() => TitleActions.markAsPristine())
    ))
  ));
  loadMyTitles$ = createEffect(() => this.actions$.pipe(
    ofType(TitleActions.loadMyTitles),
    switchMap(action => this.titleService.getMyTitles().pipe(
      map(titles => TitleActions.setMyTitles({titles}))
    ))
  ));

  constructor(
    private titleService: TitleService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

}
