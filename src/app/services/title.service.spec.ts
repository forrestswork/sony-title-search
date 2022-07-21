import { TestBed } from '@angular/core/testing';

import { TitleService, myTitlesStorageKey } from './title.service';
import {titles} from '../data/titles';

describe('TitleService', () => {
  let service: TitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch the titles', (done: DoneFn) => {
    service.getTitles().subscribe(res => {
      expect(res).toEqual(titles);
      done();
    })
  })

  it('should save my titles to local storage', (done: DoneFn) => {
    const myTitles = [{...titles[0]}];
    service.saveMyTitles(myTitles).subscribe(res => {
      const stored = localStorage.getItem(myTitlesStorageKey);
      expect(stored).toBeTruthy();
      if (stored) {
        const storedTitles = JSON.parse(stored);
        expect(storedTitles).toEqual(myTitles);
      }
      done();
    })
  })

  it('should get my titles from local storage', (done: DoneFn) => {
    const myTitles = [{...titles[0]}];
    service.saveMyTitles(myTitles).subscribe(() => {
      service.getMyTitles().subscribe(res => {
        expect(res).toEqual(myTitles);
        done();
      })
    })
  })
});
