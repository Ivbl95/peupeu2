import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private readonly drawer$: BehaviorSubject<MatDrawer | null> =
    new BehaviorSubject<MatDrawer | null>(null);

  public setDrawer(drawer: MatDrawer | null): void {
    this.drawer$.next(drawer);
  }

  public closeDrawer(): void {
    this.drawer$.pipe(take(1)).subscribe((drawer: MatDrawer | null) => {
      drawer && drawer.close();
    });
  }

  public toggleDrawer(): void {
    this.drawer$.pipe(take(1)).subscribe((drawer: MatDrawer | null) => {
      drawer && drawer.toggle();
    });
  }
}
