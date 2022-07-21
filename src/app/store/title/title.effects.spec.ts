import { TestBed } from '@angular/core/testing';
import { provideMockActions} from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { TitleEffects } from './title.effects';
import {initialState} from './title.reducer';

describe('TitleEffects', () => {
  let actions$: Observable<any>;
  let effects: TitleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TitleEffects,
        provideMockActions(() => actions$),
        provideMockStore({initialState})
      ]
    });

    effects = TestBed.inject(TitleEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  // todo test actions against effect
});
