import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatExpansionPanelHarness} from '@angular/material/expansion/testing';

import { TitleListComponent } from './title-list.component';
import {titles} from '../../data/titles';
import {MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonHarness} from '@angular/material/button/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialState, titleReducer} from '../../store/title/title.reducer';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ReactiveFormsModule} from '@angular/forms';
import {selectMyTitles} from '../../store/title/title.selectors';
import {first, firstValueFrom, interval, lastValueFrom, take, takeUntil, takeWhile} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Title} from '../../store/title/title.interfaces';
import {Store, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {TitleEffects} from '../../store/title/title.effects';
import {TitleService} from '../../services/title.service';
import {AppState} from '../../store/app';
import {setMyTitles} from '../../store/title/title.actions';

let loader: HarnessLoader;

describe('TitleListComponent', () => {
  let component: TitleListComponent;
  let fixture: ComponentFixture<TitleListComponent>;
  let store: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleListComponent ],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        MatButtonModule,
        MatExpansionModule,
        MatIconModule,
        MatListModule,
        MatSnackBarModule,
        StoreModule.forRoot({
          title: titleReducer
        }, {}),
        EffectsModule.forRoot([TitleEffects]),
      ],
      providers: [
        TitleService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
    store = TestBed.inject(Store);
    store.dispatch(setMyTitles({titles: [
        ...titles.slice(0,3)
      ]}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a panel for each title', async () => {
    fixture.detectChanges();

    // find all of the panels
    const panels = await loader.getAllHarnesses(MatExpansionPanelHarness);

    // confirm that there are an equal number of panels to myTitles
    expect(panels.length).toEqual(3);
  });

  it('should remove a title', async () => {
    fixture.detectChanges();
    // find the first button
    const button = await loader.getHarness(MatButtonHarness);

    // trigger the click event
    await button.click();

    // confirm that the title was removed
    const res = await firstValueFrom(store.select(selectMyTitles));
    expect(res.length).toEqual(2);
  });
});
