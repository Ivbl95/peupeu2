import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { DrawerService } from 'src/app/services/drawer.service';
import { Content } from 'src/app/types/content.type';
import { Theme } from 'src/app/types/theme.type';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent {
  public readonly content$: Observable<Content> = this.contentService.content$;

  public readonly technologiesList$: Observable<string[]> =
    this.contentService.technologiesList$;

  constructor(
    private readonly contentService: ContentService,
    private readonly drawerService: DrawerService
  ) {}

  public clickButton(theme: Theme): void {
    this.contentService.setCurrentTheme(theme);
    this.drawerService.closeDrawer();
  }
}
