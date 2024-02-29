import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { content } from '../content/content';
import { ContentNamespace } from '../content/content.interface';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  public readonly content: ContentNamespace.Technology[] = content;

  public readonly currentTheme$: BehaviorSubject<ContentNamespace.Theme | null> =
    new BehaviorSubject<ContentNamespace.Theme | null>(null);

  public setCurrentTheme(theme: ContentNamespace.Theme): void {
    this.currentTheme$.next(theme);
  }
}
