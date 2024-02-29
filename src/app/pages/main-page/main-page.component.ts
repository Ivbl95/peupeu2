import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DrawerService } from 'src/app/services/drawer.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements AfterViewInit {
  @ViewChild('drawer') drawer: MatDrawer | null = null;
  constructor(private readonly drawerService: DrawerService) {}
  public ngAfterViewInit(): void {
    this.drawerService.setDrawer(this.drawer);
  }
}
