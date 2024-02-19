import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { content } from '../content/content';
import { contentNamespace } from '../content/content.interface';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  public readonly content: contentNamespace.technology[] = content;

  public readonly currentTheme$: BehaviorSubject<contentNamespace.theme | null> =
    new BehaviorSubject<contentNamespace.theme | null>(null);

  public setCurrentTheme(theme: contentNamespace.theme): void {
    this.currentTheme$.next(theme);
  }
}
