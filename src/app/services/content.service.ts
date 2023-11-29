import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { contentGeneral } from '../content/content-general';
import { contentParts } from '../content/content-parts';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  public readonly contentParts: any = contentParts;
  public readonly contentGeneral: any = contentGeneral;
  public readonly technologies: string[] = Object.keys(contentGeneral);

  private readonly currentThemeSubject$: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  public readonly currentTheme$: Observable<string | null> =
    this.currentThemeSubject$.asObservable();

  public setCurrentTheme(theme: string): void {
    this.currentThemeSubject$.next(theme);
  }

  constructor() {}
}
