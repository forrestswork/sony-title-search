import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Title} from '../store/title/title.interfaces';
import {titles} from '../data/titles';

export const myTitlesStorageKey = 'my-titles';
@Injectable({
  providedIn: 'root'
})
export class TitleService {
  getTitles(): Observable<Title[]> {
    return of(titles);
  }

  saveMyTitles(titles: Title[]): Observable<boolean> {
    localStorage.setItem(myTitlesStorageKey, JSON.stringify(titles));
    // we return an observable to mock storing the data in a remote source
    return of(true);
  }

  getMyTitles(): Observable<Title[]> {
    const myTitles = localStorage.getItem(myTitlesStorageKey);
    const titles = myTitles ? [...JSON.parse(myTitles)] : [];
    return of(titles);
  }
}
