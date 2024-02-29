import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentNamespace } from 'src/app/content/content.interface';
import { ContentService } from 'src/app/services/content.service';
import { DrawerService } from 'src/app/services/drawer.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
  public readonly currentTheme$: Observable<ContentNamespace.Theme | null> =
    this.contentService.currentTheme$;
  constructor(
    private readonly contentService: ContentService,
    private readonly drawerService: DrawerService
  ) {}

  public toggleDrawer(): void {
    this.drawerService.toggleDrawer();
  }
}
