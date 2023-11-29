import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { DrawerService } from 'src/app/services/drawer.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent {
  public readonly contentGeneral: any = this.contentService.contentGeneral;

  constructor(
    private readonly contentService: ContentService,
    private readonly drawerService: DrawerService
  ) {}

  public clickButton(theme: string): void {
    this.contentService.setCurrentTheme(theme);
    this.drawerService.closeDrawer();
  }
}
