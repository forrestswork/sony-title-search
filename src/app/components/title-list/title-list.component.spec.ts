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


let loader: HarnessLoader;

describe('TitleListComponent', () => {
  let component: TitleListComponent;
  let fixture: ComponentFixture<TitleListComponent>;

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
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a panel for each title', async () => {
    component.titles = titles;
    fixture.detectChanges();
    const panels = await loader.getAllHarnesses(MatExpansionPanelHarness);
    expect(panels.length).toEqual(50);
  });

  it('should should fire the event when a title is removed', (done: DoneFn) => {
    component.titles = titles;
    fixture.detectChanges();
    loader.getAllHarnesses(MatButtonHarness).then(buttons => {
      component.removeTitle.subscribe(title => {
        expect(title).toEqual(titles[0]);
        done();
      })
      buttons[0].click();
    });
  });
});
