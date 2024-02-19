import { ChangeDetectionStrategy, Component } from '@angular/core';
import { contentNamespace } from 'src/app/content/content.interface';
import { ContentService } from 'src/app/services/content.service';
import { DrawerService } from 'src/app/services/drawer.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent {
  public readonly content: contentNamespace.technology[] =
    this.contentService.content;

  constructor(
    private readonly contentService: ContentService,
    private readonly drawerService: DrawerService
  ) {}

  public clickButton(theme: contentNamespace.theme): void {
    this.contentService.setCurrentTheme(theme);
    this.drawerService.closeDrawer();
  }
}
