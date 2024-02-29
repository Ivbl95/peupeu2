import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentNamespace } from 'src/app/content/content.interface';
import { ContentService } from 'src/app/services/content.service';
import { DrawerService } from 'src/app/services/drawer.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent {
  public readonly content: ContentNamespace.Technology[] =
    this.contentService.content;

  constructor(
    private readonly contentService: ContentService,
    private readonly drawerService: DrawerService
  ) {}

  public setCurrentTheme(theme: ContentNamespace.Theme): void {
    this.contentService.setCurrentTheme(theme);
    this.drawerService.closeDrawer();
  }
}
