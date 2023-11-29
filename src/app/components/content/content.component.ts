import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { DrawerService } from 'src/app/services/drawer.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
  public readonly contentParts: any = this.contentService.contentParts;
  public readonly contentGeneral: any = this.contentService.contentGeneral;
  public readonly drawer$: Observable<MatDrawer | null> =
    this.drawerService.drawer$;

  public readonly currentTheme$: Observable<string | null> =
    this.contentService.currentTheme$;
  constructor(
    private readonly contentService: ContentService,
    private readonly drawerService: DrawerService
  ) {}
}
