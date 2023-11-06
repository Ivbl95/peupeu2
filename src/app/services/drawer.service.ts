import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private readonly drawerSubject$: BehaviorSubject<MatDrawer | null> =
    new BehaviorSubject<MatDrawer | null>(null);

  public readonly drawer$: Observable<MatDrawer | null> =
    this.drawerSubject$.asObservable();

  public setDrawer(drawer: MatDrawer): void {
    this.drawerSubject$.next(drawer);
  }

  public closeDrawer(): void {
    this.drawerSubject$.pipe(take(1)).subscribe((drawer: MatDrawer | null) => {
      drawer && drawer.close();
    });
  }
}
