import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Content } from '../types/content.type';
import { Theme } from '../types/theme.type';
import contentJson from './../themes/content.json';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  public readonly content$: Observable<Content> = of(contentJson);

  public readonly technologiesList$: Observable<string[]> = this.content$.pipe(
    map((content: Content) => Object.keys(content.technologies))
  );

  private readonly currentThemeSubject$: BehaviorSubject<Theme | null> =
    new BehaviorSubject<Theme | null>(null);

  public readonly currentTheme$: Observable<Theme | null> =
    this.currentThemeSubject$.asObservable();

  public setCurrentTheme(theme: Theme): void {
    this.currentThemeSubject$.next(theme);
  }
}
