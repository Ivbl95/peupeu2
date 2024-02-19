import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { contentNamespace } from 'src/app/content/content.interface';
import { ContentService } from 'src/app/services/content.service';
import { DrawerService } from 'src/app/services/drawer.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
  public readonly drawer$: Observable<MatDrawer | null> =
    this.drawerService.drawer$;

  public readonly currentTheme$: Observable<contentNamespace.theme | null> =
    this.contentService.currentTheme$;
  constructor(
    private readonly contentService: ContentService,
    private readonly drawerService: DrawerService
  ) {}
}
